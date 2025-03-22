import apiClient from "@/lib/api";

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
export const gsFetchMissions = async (): Promise<Mission[]> => {
  const response = await apiClient.get<Mission[]>("/api/v1/request/");
  return response.data;
};
