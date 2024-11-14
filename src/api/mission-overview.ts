type MissionColor =
    | "bg-green-200"
    | "bg-blue-200"
    | "bg-red-200"
    | "bg-yellow-200"
    | "bg-purple-200"
    | "bg-orange-200"
    | "bg-teal-200"
    | "bg-gray-200";

export interface missions {
    id: number;
    title: string;
    location: string;
    duration: string;
    date: string;
    color: MissionColor;
}

export const missions = [
    {
        id: 1,
        title: "Coastal Monitoring (RADARSAT-2)",
        location: "Brazilian Coast, South America",
        duration: "2 Hours",
        date: "November 20, 2024",
        color: "bg-green-200",
    },
    {
        id: 2,
        title: "Urban Development Analysis (RADARSAT Constellation)",
        location: "Los Angeles, North America",
        duration: "3 Hours 30 Minutes",
        date: "November 21, 2024",
        color: "bg-red-200",
    },
    {
        id: 3,
        title: "Agricultural Survey (RADARSAT-2)",
        location: "Punjab, Asia",
        duration: "4 Hours",
        date: "November 22, 2024",
        color: "bg-blue-200",
    },
    {
        id: 4,
        title: "Arctic Ice Monitoring (RADARSAT Constellation)",
        location: "Nunavut, Canada",
        duration: "3 Hours",
        date: "November 23, 2024",
        color: "bg-yellow-200",
    },
    {
        id: 5,
        title: "Disaster Relief Mapping (RADARSAT-2)",
        location: "Jakarta, Asia",
        duration: "5 Hours",
        date: "November 24, 2024",
        color: "bg-purple-200",
    },
    {
        id: 6,
        title: "Ocean Current Monitoring (SCISAT)",
        location: "Pacific Ocean, International Waters",
        duration: "6 Hours",
        date: "November 25, 2024",
        color: "bg-orange-200",
    },
    {
        id: 7,
        title: "Forest Conservation Survey (RADARSAT-2)",
        location: "Amazon Rainforest, South America",
        duration: "3 Hours 45 Minutes",
        date: "November 26, 2024",
        color: "bg-teal-200",
    },
    {
        id: 8,
        title: "Atmospheric Composition Analysis (SCISAT)",
        location: "Arctic Circle, Northern Hemisphere",
        duration: "4 Hours 15 Minutes",
        date: "November 27, 2024",
        color: "bg-green-200",
    },
];