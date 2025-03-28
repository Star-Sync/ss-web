import apiClient from '@/lib/api';

export interface Satellite {
    id: string;
    name: string;
    tle: string;
    uplink: number;
    telemetry: number;
    science: number;
    priority: number;
    ex_cones?: any[];
}

export const getSatellites = async (): Promise<Satellite[]> => {
    try {
        const response = await apiClient.get<Satellite[]>('/api/v1/satellites');
        return response.data;
    } catch (error) {
        console.error('Error fetching satellites:', error);
        return [];
    }
};
