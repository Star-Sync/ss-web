"use client";

import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";

interface LogoutButtonProps {
    className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ className }) => {
    const { keycloak } = useKeycloak();
    const router = useRouter();
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/`;

    const handleLogout = async () => {
        try {
            console.log(redirectUri);
            // Clear the Keycloak session
            await keycloak.logout({
                redirectUri: redirectUri, 
            });

            // Clear browser session storage if needed
            sessionStorage.clear();

            // Redirect to home page
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            // You can show an error message to the user here
            alert("Failed to logout. Please try again.");
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={className}
            type="button"
        >
            Log out
        </button>
    );
};
