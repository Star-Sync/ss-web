import moment from "moment";
import { Mission } from "./fetchMissions";

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
}

// Map station names to group IDs
const getGroupId = (station: string): number => {
  if (station.includes("Inuvik")) return 3;
  if (station.includes("Gatineau")) return 2;
  if (station.includes("Prince Albert")) return 1;
  return 2;
};

// Convert missions to timeline items
export const createTimelineItems = (missions: Mission[]): TimelineItem[] => {
  return missions.map((mission: Mission, index: number) => {
    let start = moment(mission.startTime);
    let end = moment(mission.endTime);

    // Ensure start and end times are correctly ordered
    if (end.isBefore(start)) {
      [start, end] = [end, start];
    }

    return {
      id: index + 1,
      group: getGroupId(mission.station),
      title: `${mission.mission} - ${mission.satellite}`,
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
    };
  });
};
