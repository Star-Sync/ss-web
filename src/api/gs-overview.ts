import apiClient from '@/lib/api';

export interface GroundStation {
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

export const getGroundStations = async (): Promise<GroundStation[]> => {
    try {
        const response = await apiClient.get<GroundStation[]>('/api/v1/gs');
        return response.data;
    } catch (error) {
        console.error('Error fetching ground stations:', error);
        return [];
    }
};
