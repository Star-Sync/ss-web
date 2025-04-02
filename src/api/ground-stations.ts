import apiClient from '@/lib/api';

export interface Ground {
    id: string;
    name: string;
    lat: string;
    lon: string;
    height: string;
    mask: number;
    uplink: string;
    downlink: string;
    science: string;
}

// Helper function to extract error messages from API responses
export function getApiErrorMessage(err: unknown, defaultMessage: string = "An error occurred."): string {
    if (err && typeof err === 'object' && 'response' in err && 
        err.response && typeof err.response === 'object' && 
        'data' in err.response && err.response.data && 
        typeof err.response.data === 'object' && 'detail' in err.response.data) {
        return err.response.data.detail as string;
    }
    return defaultMessage;
}

export const createGroundStation = async (data: Omit<Ground, 'id'>): Promise<Ground> => {
    try {
        const response = await apiClient.post<Ground>('/api/v1/gs/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating ground station:', error);
        throw error;
    }
};

export const getGroundStations = async (): Promise<Ground[]> => {
    try {
        const response = await apiClient.get<Ground[]>("/api/v1/gs/");
        return response.data;
    } catch (error) {
        console.error('Error fetching ground stations:', error);
        throw error;
    }
};

// This is the same as getGroundStations but returns an empty array on error instead of throwing
export const getGroundStationsSafe = async (): Promise<Ground[]> => {
    try {
        const response = await apiClient.get<Ground[]>('/api/v1/gs');
        return response.data;
    } catch (error) {
        console.error('Error fetching ground stations:', error);
        return [];
    }
};

export const updateGroundStation = async (id: string, data: Partial<Ground>): Promise<Ground> => {
    try {
        const response = await apiClient.patch<Ground>(`/api/v1/gs/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating ground station:', error);
        throw error;
    }
};

export const deleteGroundStation = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/gs/${id}`);
    } catch (error) {
        console.error('Error deleting ground station:', error);
        throw error;
    }
}; 