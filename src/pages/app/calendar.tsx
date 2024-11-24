import React, { useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import MotionWrapper from "@/components/app/MotionWrapper";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import axios from "axios";

// Define Mission interface
interface Mission {
  requestType: string;
  mission: string;
  satellite: string;
  station: string;
  startTime: string;
  endTime: string;
  duration: number;
  aos: string;
  rf_on: string;
  rf_off: string;
  los: string;
}

// Define TimelineItem interface for state
interface TimelineItem {
  id: number;
  group: number;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  itemProps: {
    className: string;
    style: React.CSSProperties;
  };
}

// Group interface for the timeline
interface Group {
  id: number;
  title: string;
}

const CalendarPage = () => {
  const groups: Group[] = [
    { id: 1, title: "Prince Albert" },
    { id: 2, title: "Gatineau" },
    { id: 3, title: "Inuvik" },
  ];

  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map station names to group IDs
  const getGroupId = (station: string): number => {
    if (station.includes("Inuvik")) return 3;
    if (station.includes("Gatineau")) return 2;
    if (station.includes("Prince Albert")) return 1;
    return 2;
  };

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const axiosInstance = axios.create({
          baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
          headers: { "Content-Type": "application/json" },
        });

        const response = await axiosInstance.get<Mission[]>("/api/v1/request/");
        const missions = response.data;

        console.log("Raw response:", missions);

        if (missions && missions.length > 0) {
          // Transform the API response into Timeline items
          const missionItems: TimelineItem[] = missions.map((mission: Mission, index: number) => {
            let start = moment(mission.startTime);
            let end = moment(mission.endTime);

            // Check if end time is before start time, and swap if necessary
            if (end.isBefore(start)) {
              const temp = start;
              start = end;
              end = temp;
            }

            console.log("Processing mission times:", {
              mission: mission.mission,
              start: start.format("YYYY-MM-DD HH:mm:ss"),
              end: end.format("YYYY-MM-DD HH:mm:ss"),
            });

            return {
              id: index + 1,
              group: getGroupId(mission.station),
              title: `${mission.mission} - ${mission.satellite}`,
              start_time: start, // Store as Moment object
              end_time: end,     // Store as Moment object
              itemProps: {
                className: "custom-item",
                style: {
                  background: "#4338ca",
                  color: "white",
                  borderRadius: "4px",
                  padding: "2px 6px",
                },
              },
            };
          });

          console.log("Processed items:", missionItems);
          setItems(missionItems); // Update the timeline with the processed items
        }
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const defaultStartTime = moment().startOf("day");
  const defaultEndTime = moment().endOf("day");

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div>Loading missions...</div>
      </div>
    );

  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );

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
          defaultTimeStart={defaultStartTime}
          defaultTimeEnd={defaultEndTime}
          canMove={true}
          canResize="both"
          lineHeight={50}
          itemHeightRatio={0.8}
          minZoom={60 * 60 * 1000} // 1 hour minimum zoom
          maxZoom={7 * 24 * 60 * 60 * 1000} // 7 days maximum zoom
        />
      </div>
    </MotionWrapper>
  );
};

export default CalendarPage;
