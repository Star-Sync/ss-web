// src/components/guards/AuthGuard.tsx
import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

interface AuthGuardProps {
    children: React.ReactNode;
}

const AuthGuardComponent = ({ children }: AuthGuardProps) => {
    const { keycloak, initialized } = useKeycloak();
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (initialized && isChecking) {
            if (!keycloak.authenticated) {
                if (!router.asPath.includes("state=") && !router.asPath.includes("code=")) {
                    try {
                        keycloak.login({
                            redirectUri: window.location.origin + router.asPath,
                            scope: "openid profile email", // Explicitly define scopes
                        });
                    } catch (error) {
                        console.error("Login error:", error);
                    }
                }
            }
            setIsChecking(false);
        }
    }, [initialized, keycloak, router, isChecking]);

    // Add error handling for token refresh
    useEffect(() => {
        if (initialized && keycloak.authenticated) {
            keycloak.onTokenExpired = () => {
                try {
                    keycloak.updateToken(70);
                } catch (error) {
                    console.error("Token refresh error:", error);
                    keycloak.login();
                }
            };
        }
    }, [initialized, keycloak]);

    if (isChecking || !initialized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!keycloak.authenticated) {
        return null;
    }

    return <>{children}</>;
};

export const AuthGuard = dynamic(() => Promise.resolve(AuthGuardComponent), {
    ssr: false,
});
