import moment from "moment";
import { Booking } from "@/api/gs-fetch-missions";
import React from "react";
import { getColorFromId } from "@/lib/utils";
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
export const createTimelineItems = (bookings: Booking[], visibleTimeStart?: number, visibleTimeEnd?: number): TimelineItem[] => {
    // Calculate time range in hours if provided
    const timeRangeInHours = visibleTimeStart && visibleTimeEnd 
        ? (visibleTimeEnd - visibleTimeStart) / (1000 * 60 * 60)
        : 0;

    return bookings.map((booking: Booking, index: number) => {
        let start = moment(booking.slot.start_time);
        let end = moment(booking.slot.end_time);

        // Ensure start and end times are correctly ordered
        if (end.isBefore(start)) {
            [start, end] = [end, start];
        }

        const backgroundColor = getColorFromId(booking.request_id);
        console.log(timeRangeInHours)
        return {
            id: index + 1,
            group: booking.gs_id,
            title: timeRangeInHours > 24 ? '' : `${booking.id.slice(0, 5)}`,
            start_time: start,
            end_time: end,
            itemProps: {
                className: "custom-item",
                style: {
                    background: backgroundColor,
                    color: "#4a5568",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    minWidth: "4px",
                },
            },
            description: `Request ID: ${booking.request_id}\nBooking ID: ${booking.id}`,
        };
    });
};