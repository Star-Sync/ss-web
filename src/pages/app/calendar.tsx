// src/pages/calendar.tsx

import React, { useState } from "react";
import Timeline from "react-calendar-timeline";
import MotionWrapper from "@/components/app/MotionWrapper";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";

const CalendarPage = () => {
  const groups = [
    { id: 1, title: "Prince Albert" },
    { id: 2, title: "Gatineau" },
    { id: 3, title: "Inuvik" },
  ];

  const [items, setItems] = useState([
    {
      id: 1,
      group: 1,
      title: "Mission 1",
      start_time: moment(),
      end_time: moment().add(1, "hour"),
    },
    {
      id: 2,
      group: 2,
      title: "Mission 2",
      start_time: moment().add(2, "hour"),
      end_time: moment().add(3, "hour"),
    },
  ]);

  const handleCanvasClick = (groupId: number, time: number) => {
    const newItem = {
      id: items.length + 1,
      group: groupId,
      title: `New Mission ${items.length + 1}`,
      start_time: moment(time),
      end_time: moment(time).add(1, "hour"),
    };

    setItems([...items, newItem]);
  };

  const handleItemMove = (itemId: number, dragTime: number, newGroupOrder: number) => {
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, start_time: moment(dragTime), end_time: moment(dragTime).add(1, "hour"), group: newGroupOrder }
        : item
    );
    setItems(updatedItems);
  };

  const handleItemResize = (itemId: number, time: number, edge: "left" | "right") => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          start_time: edge === "left" ? moment(time) : item.start_time,
          end_time: edge === "right" ? moment(time) : item.end_time,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <MotionWrapper
      className="w-full h-full flex flex-col bg-gray-50 p-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MotionWrapper className="bg-white rounded-xl p-6 shadow-md mb-4" animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-black">Scheduling Calendar</h1>
        <p className="text-md text-gray-500 mb-4">
          View and manage your schedule effortlessly.
        </p>
      </MotionWrapper>
      <div className="calendar-container bg-white rounded-xl p-6 shadow-md">
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
          canMove={true}
          canResize="both"
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          onCanvasClick={handleCanvasClick}
        />
      </div>
    </MotionWrapper>
  );
};

export default CalendarPage;
