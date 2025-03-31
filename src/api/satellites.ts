import apiClient from '@/lib/api';

export interface Satellite {
    id: string;
    name: string;
    priority: number;
    uplink: number;
    telemetry: number;
    science: number;
    tle: string;
    ex_cones?: any[];
}

export const createSatellite = async (data: Omit<Satellite, 'id'>): Promise<Satellite> => {
    try {
        const response = await apiClient.post<Satellite>('/api/v1/satellites/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating satellite:', error);
        throw error;
    }
};

export const getSatellites = async (): Promise<Satellite[]> => {
    try {
        const response = await apiClient.get<Satellite[]>("/api/v1/satellites/");
        return response.data.map((sat) => ({
            ...sat,
            uplink: typeof sat.uplink === "number" ? sat.uplink : 0,
            telemetry: typeof sat.telemetry === "number" ? sat.telemetry : 0,
            science: typeof sat.science === "number" ? sat.science : 0,
        }));
    } catch (error) {
        console.error('Error fetching satellites:', error);
        throw error;
    }
};

// This is the same as getSatellites but returns an empty array on error instead of throwing
export const getSatellitesSafe = async (): Promise<Satellite[]> => {
    try {
        const response = await apiClient.get<Satellite[]>('/api/v1/satellites');
        return response.data;
    } catch (error) {
        console.error('Error fetching satellites:', error);
        return [];
    }
};

export const updateSatellite = async (id: string, data: Partial<Satellite>): Promise<Satellite> => {
    try {
        const response = await apiClient.patch<Satellite>(`/api/v1/satellites/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating satellite:', error);
        throw error;
    }
};

export const deleteSatellite = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/satellites/${id}`);
    } catch (error) {
        console.error('Error deleting satellite:', error);
        throw error;
    }
}; 