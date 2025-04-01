import apiClient from '@/lib/api';

export interface RFTimeRequest {
    missionName: string;
    satelliteId: string;
    startTime: string;
    endTime: string;
    uplinkTime: number;
    downlinkTime: number;
    scienceTime: number;
    minimumNumberOfPasses: number;
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

export const createRFTimeRequest = async (data: RFTimeRequest): Promise<RFTimeRequest> => {
    try {
        const response = await apiClient.post<RFTimeRequest>('/api/v1/request/rf-time/', data);
        return response.data;
    } catch (error) {
        console.error('Error creating RF time request:', error);
        throw error;
    }
}; 