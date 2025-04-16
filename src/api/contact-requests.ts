import apiClient from '@/lib/api';

export interface ContactRequest {
    missionName: string;
    satelliteId: string;
    station_id: string;
    orbit: number;
    uplink: boolean;
    telemetry: boolean;
    science: boolean;
    aosTime: string;
    rfOnTime: string;
    rfOffTime: string;
    losTime: string;
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

export const createContactRequest = async (data: ContactRequest): Promise<ContactRequest> => {
    try {
        const response = await apiClient.post<ContactRequest>("/api/v1/request/contact", data);
        return response.data;
    } catch (error) {
        console.error('Error creating contact request:', error);
        throw error;
    }
};
