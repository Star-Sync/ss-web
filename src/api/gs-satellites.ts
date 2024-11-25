export interface Satellite {
    satellite_id: string;
    label: string;
}

export const satellites: Satellite[] = [
    { satellite_id: "1", label: "Aurora-1 (Polar Observation)" },
    { satellite_id: "2", label: "Nova-2 (Climate Monitoring)" },
    { satellite_id: "3", label: "Vancouver-3 (Earth Imaging)" },
    { satellite_id: "4", label: "Montreal-4 (Communication)" },
    { satellite_id: "5", label: "Calgary-5 (Scientific Research)" },
];
