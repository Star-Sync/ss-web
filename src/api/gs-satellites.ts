import axios from "axios";

export interface Satellite {
    id: string;
    name: string;
    tle: string;
    uplink: number;
    telemetry: number;
    science: number;
    priority: number;
    ex_cones: any[];
}

// API call to fetch satellites
export const gsFetchSatellites = async (): Promise<Satellite[]> => {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: { "Content-Type": "application/json" },
    });

    const response = await axiosInstance.get<Satellite[]>("/api/v1/satellites/");
    return response.data;
};
