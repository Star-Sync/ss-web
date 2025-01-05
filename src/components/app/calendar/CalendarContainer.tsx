import React, {useState, useEffect, useCallback} from "react";
import Timeline, {
    TimelineHeaders,
    DateHeader,
    SidebarHeader,
    TimelineMarkers,
    CustomMarker,
} from "react-calendar-timeline";
import MotionWrapper from "@/components/app/MotionWrapper";

import moment from "moment";
import { gsFetchMissions } from "@/api/gs-fetch-missions";
import { createTimelineItems, TimelineItem } from "@/components/app/calendar/CalendarItems";
import { MissionModal } from "@/components/app/calendar/MissionModal";
import {toast} from "@/hooks/use-toast";

const groups = [
    { id: 1, title: "Prince Albert" },
    { id: 2, title: "Gatineau" },
    { id: 3, title: "Inuvik" },
];

const CalendarContainer = () => {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMission, setSelectedMission] = useState<TimelineItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visibleTimeStart, setVisibleTimeStart] = useState(
        moment().startOf("day").valueOf()
    );
    const [visibleTimeEnd, setVisibleTimeEnd] = useState(
        moment().endOf("day").valueOf()
    );

    const handleItemClick = (itemId: number) => {
        const mission = items.find((item) => item.id === itemId);
        if (mission) {
            setSelectedMission(mission);
            setIsModalOpen(true);
        }
    };

    // Edge case: Refresh the calendar when the sidebar button is clicked
    // Ensure that calendar fills the available space after the sidebar is closed
    useEffect(() => {
        const handleSidebarButtonClick = () => {
            setTimeout(() => {
                fetchAndSetMissions();
            }, 200);
        };
        window.addEventListener("sidebarButtonClick", handleSidebarButtonClick);

        return () => {
            window.removeEventListener("sidebarButtonClick", handleSidebarButtonClick);
        };
    }, []);

    // Set scrolling limits (6 months before and after current time)
    const minTime = moment().add(-6, "months").valueOf();
    const maxTime = moment().add(6, "months").valueOf();

    const fetchAndSetMissions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const missions = await gsFetchMissions(); // Await for the missions to be fetched
            const timelineItems = createTimelineItems(missions); // Process the missions
            setItems(timelineItems); // Update the state with new items
        } catch (err) {
            console.error("Error fetching missions:", err);
            setError(
                err instanceof Error ? err.message : "An unknown error occurred"
            );
        } finally {
            setIsLoading(false); // Ensure loading state is updated
        }
    }, []);

    useEffect(() => {
        fetchAndSetMissions().then(r => console.log('Missions fetched:', r));
    }, []);

    const handleTimeChange = (
        newVisibleTimeStart: number,
        newVisibleTimeEnd: number,
        updateScrollCanvas: (start: number, end: number) => void
    ) => {
        if (newVisibleTimeStart < minTime && newVisibleTimeEnd > maxTime) {
            updateScrollCanvas(minTime, maxTime);
        } else if (newVisibleTimeStart < minTime) {
            updateScrollCanvas(
                minTime,
                minTime + (newVisibleTimeEnd - newVisibleTimeStart)
            );
        } else if (newVisibleTimeEnd > maxTime) {
            updateScrollCanvas(
                maxTime - (newVisibleTimeEnd - newVisibleTimeStart),
                maxTime
            );
        } else {
            updateScrollCanvas(newVisibleTimeStart, newVisibleTimeEnd);
        }

        setVisibleTimeStart(newVisibleTimeStart);
        setVisibleTimeEnd(newVisibleTimeEnd);
    };

    if (isLoading)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div>Loading missions...</div>
            </div>
        );

    if (error) {
        toast({
            title: "Error: " + error,
            description: "There was an error fetching from the API. Please try again.",
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
        <MotionWrapper className="bg-white rounded-xl p-6 shadow-md mb-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-black">Scheduling Calendar</h1>
                    <p className="text-md text-gray-500">
                        View and manage your schedule effortlessly.
                    </p>
                </div>
                {/* Refresh Button */}
                <button
                    onClick={fetchAndSetMissions}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Refresh
                </button>
            </div>
            <div className="rounded-xl overflow-hidden">
                <Timeline
                    groups={groups}
                    items={items}
                    visibleTimeStart={visibleTimeStart}
                    visibleTimeEnd={visibleTimeEnd}
                    onTimeChange={handleTimeChange}
                    onItemClick={handleItemClick}
                    canMove={true}
                    canResize="both"
                    lineHeight={50}
                    itemHeightRatio={0.8}
                    minZoom={60 * 60 * 1000} // 1 hour minimum zoom
                    maxZoom={7 * 24 * 60 * 60 * 1000} // 7 days maximum zoom
                    buffer={1} // Disable extra rendering to reduce scroll sensitivity
                >
                    <TimelineHeaders>
                        <SidebarHeader>
                            {({ getRootProps }) => {
                                return (
                                    <div className="bg-gray-500" {...getRootProps()}>
                                        <div className="p-6 text-center text-white font-bold">
                                            Groundstations
                                        </div>
                                    </div>
                                );
                            }}
                        </SidebarHeader>
                        <DateHeader
                            unit="primaryHeader"
                            className="bg-gray-500 font-bold"
                        />
                        <DateHeader />
                    </TimelineHeaders>
                    <TimelineMarkers>
                        <CustomMarker date={Date.now()}>
                            {({ styles }) => {
                                const customStyles = {
                                    ...styles,
                                    backgroundColor: "transparent",
                                    width: "2px",
                                    borderRadius: "1px",
                                    border: "1px dashed red",
                                    zIndex: 1000,
                                };
                                return <div style={customStyles} />;
                            }}
                        </CustomMarker>
                    </TimelineMarkers>
                </Timeline>
                <MissionModal
                    mission={selectedMission}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </MotionWrapper>
    );
};

export default CalendarContainer;
