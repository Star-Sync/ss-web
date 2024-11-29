import React, { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import MotionWrapper from "@/components/app/MotionWrapper";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { gsFetchMissions } from "@/api/gs-fetch-missions";
import { createTimelineItems, TimelineItem } from "@/components/app/calendar/CalendarItems";
import {toast} from "@/hooks/use-toast";

const groups = [
  { id: 1, title: "Prince Albert" },
  { id: 2, title: "Gatineau" },
  { id: 3, title: "Inuvik" },
];

const CalendarPage = () => {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleTimeStart, setVisibleTimeStart] = useState(
    moment().startOf("day").valueOf()
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    moment().endOf("day").valueOf()
  );

  // Set scrolling limits (6 months before and after current time)
  const minTime = moment().add(-6, 'months').valueOf();
  const maxTime = moment().add(6, 'months').valueOf();

  useEffect(() => {
    const fetchAndSetMissions = async () => {
      try {
        const missions = await gsFetchMissions();
        const timelineItems = createTimelineItems(missions);
        setItems(timelineItems);
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetMissions();
  }, []);

  const handleTimeChange = (
    newVisibleTimeStart: number,
    newVisibleTimeEnd: number,
    updateScrollCanvas: (start: number, end: number) => void
  ) => {
    if (newVisibleTimeStart < minTime && newVisibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime);
    } else if (newVisibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (newVisibleTimeEnd - newVisibleTimeStart));
    } else if (newVisibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (newVisibleTimeEnd - newVisibleTimeStart), maxTime);
    } else {
      updateScrollCanvas(newVisibleTimeStart, newVisibleTimeEnd);
    }

    setVisibleTimeStart(newVisibleTimeStart);
    setVisibleTimeEnd(newVisibleTimeEnd);
  };

  if (isLoading) return (
    <div className="w-full h-full flex items-center justify-center">
      <div>Loading missions...</div>
    </div>
  );

  if (error) {
    toast({
      title: "Error: " + error,
      description: "There was an error submitting the contact request. Please try again.",
      variant: "destructive",
      duration: 5000,
    });
    console.log('Error fetching missions test:', error);
    return (
        <div className="w-full h-full flex items-center justify-center">

          <div className="text-red-600">{error}</div>
        </div>
    );
  }

  return (
    <MotionWrapper
      className="w-full h-full flex flex-col bg-gray-50 p-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MotionWrapper className="bg-white rounded-xl p-6 shadow-md mb-4">
        <h1 className="text-2xl font-bold text-black">Scheduling Calendar</h1>
        <p className="text-md text-gray-500 mb-4">
          View and manage your schedule effortlessly.
        </p>
      </MotionWrapper>
      <div className="calendar-container bg-white rounded-xl p-6 shadow-md">
        <Timeline
          groups={groups}
          items={items}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          onTimeChange={handleTimeChange}
          canMove={true}
          canResize="both"
          lineHeight={50}
          itemHeightRatio={0.8}
          minZoom={60 * 60 * 1000} // 1 hour minimum zoom
          maxZoom={7 * 24 * 60 * 60 * 1000} // 7 days maximum zoom
          buffer={1} // Disable extra rendering to reduce scroll sensitivity
        />
      </div>
    </MotionWrapper>
  );
};

export default CalendarPage;