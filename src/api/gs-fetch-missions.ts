import apiClient from "@/lib/api";

export interface Slot {
  start_time: string;
  end_time: string;
}

export interface Booking {
  slot: Slot;
  gs_id: number;
  request_id: string;
  id: string;
}

// API call to fetch bookings
export const gsFetchBookings = async (): Promise<Booking[]> => {
  const response = await apiClient.get<Booking[]>("/api/v1/request/bookings/");
  return response.data;
};

