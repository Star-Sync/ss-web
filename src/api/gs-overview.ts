export interface GroundStation {
    name: string;
    location: string;
    usageData: Array<{ date: string; usage: string }>;
    usage: number;
}

// Sample data for ground stations
export const groundStations: GroundStation[] = [
    {
        name: "Gatineau Quebec GS",
        location: "Gatineau, Quebec, Canada",
        usage: 50,
        usageData: [
            { date: "2023-10-01", usage: "5 hours" },
            { date: "2023-10-02", usage: "6 hours" }
        ],

    },
    {
        name: "Vancouver BC GS",
        location: "Vancouver, British Columbia, Canada",
        usage: 75,
        usageData: [
            { date: "2023-10-01", usage: "4 hours" },
            { date: "2023-10-02", usage: "7 hours" },
        ],
    },
];
