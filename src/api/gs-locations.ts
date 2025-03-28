import apiClient from '@/lib/api';

export interface Location {
    id: number;
    name: string;
    lat: number;
    lon: number;
    height: number;
    mask: number;
    uplink: number;
    downlink: number;
    science: number;
}

export const getLocations = async (): Promise<Location[]> => {
    try {
        const response = await apiClient.get<Location[]>('/api/v1/gs');
        return response.data;
    } catch (error) {
        console.error('Error fetching ground station locations:', error);
        return [];
    }
};