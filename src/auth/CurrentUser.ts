import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
        const response = await axios.get<CurrentUser>(
            `${API_URL}/api/v1/auth/users/me`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        const message =
            error.response?.data?.detail || "Failed to fetch current user";
        throw new Error(message);
    }
}
