import moment from "moment";
import { Booking } from "@/api/gs-fetch-missions";
import React from "react";

// Define TimelineItem interface
export interface TimelineItem {
  id: number;
  group: number;
  title: string;
  start_time: moment.Moment;
  end_time: moment.Moment;
  itemProps: {
    className: string;
    style: React.CSSProperties;
  };
  description?: string;
}

// Convert bookings to timeline items
export const createTimelineItems = (bookings: Booking[]): TimelineItem[] => {
  return bookings.map((booking: Booking, index: number) => {
    let start = moment(booking.slot.start_time);
    let end = moment(booking.slot.end_time);

    // Ensure start and end times are correctly ordered
    if (end.isBefore(start)) {
      [start, end] = [end, start];
    }

    return {
      id: index + 1,
      group: booking.gs_id,
      title: `Booking ${booking.id.slice(0, 5)}`,
      start_time: start,
      end_time: end,
      itemProps: {
        className: "custom-item",
        style: {
          background: "#4338ca",
          color: "white",
          borderRadius: "4px",
          padding: "2px 6px",
        },
      },
      description: `Request ID: ${booking.request_id}\nBooking ID: ${booking.id}`,
    };
  });
};
