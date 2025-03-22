import apiClient from "@/lib/api";

export interface CurrentUser {
    id: number;
    username: string;
    email: string;
    // Add any other properties you're receiving from your backend.
}

/**
 * Fetches the current user using the /api/v1/auth/users/me endpoint.
 *
 * Note:
 * - Ensure that the "access_token" is stored in localStorage.
 * - The endpoint requires an Authorization header with a Bearer token.
 *
 * @returns A promise that resolves to the current user data.
 */
export async function fetchCurrentUser(): Promise<CurrentUser> {
    const token = localStorage.getItem("access_token");

    if (!token) {
        throw new Error("Access token is not available.");
    }

    try {
        const response = await apiClient.get<CurrentUser>(
            "/api/v1/auth/users/me"
        );
        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.detail || "Failed to fetch current user";
        throw new Error(message);
    }
}
