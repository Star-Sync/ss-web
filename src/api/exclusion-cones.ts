import apiClient from '@/lib/api';

export interface ExclusionCone {
    id: string;
    mission: string;
    angle_limit: number;
    interfering_satellite: string;
    satellite_id: string;
    gs_id: number;
}

export const getExclusionCones = async (): Promise<ExclusionCone[]> => {
    try {
        const response = await apiClient.get<ExclusionCone[]>('/api/v1/excones/');
        return response.data.map(cone => ({
            ...cone,
            angle_limit: Number(cone.angle_limit),
            gs_id: Number(cone.gs_id),
        }));
    } catch (error) {
        console.error('Error fetching exclusion cones:', error);
        throw error;
    }
};

export const createExclusionCone = async (data: Omit<ExclusionCone, 'id'>): Promise<ExclusionCone> => {
    try {
        const response = await apiClient.post<ExclusionCone>('/api/v1/excones/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating exclusion cone:', error);
        throw error;
    }
};

export const updateExclusionCone = async (id: string, data: Partial<ExclusionCone>): Promise<ExclusionCone> => {
    try {
        const response = await apiClient.patch<ExclusionCone>(`/api/v1/excones/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating exclusion cone:', error);
        throw error;
    }
};

export const deleteExclusionCone = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/excones/${id}`);
    } catch (error) {
        console.error('Error deleting exclusion cone:', error);
        throw error;
    }
}; 