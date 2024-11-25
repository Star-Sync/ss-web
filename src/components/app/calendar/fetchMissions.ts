import axios from "axios";


// Define Mission interface
export interface Mission {
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

// API call to fetch missions
export const fetchMissions = async (): Promise<Mission[]> => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
  });

  const response = await axiosInstance.get<Mission[]>("/api/v1/request/");
  return response.data;
};
