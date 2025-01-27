// src/auth/keycloak.ts
import Keycloak from "keycloak-js";

let keycloakInstance: Keycloak | null = null;

const constructKeycloakUrl = () => {
    const host = process.env.NEXT_PUBLIC_API_HOST || 'localhost';
    const port = process.env.NEXT_PUBLIC_API_KEYPORT || '8080';
    return `http://${host}:${port}`;
};

export const getKeycloak = () => {
    if (typeof window === "undefined") {
        return null;
    }

    if (!keycloakInstance) {
        keycloakInstance = new Keycloak({
            url: constructKeycloakUrl(),
            realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "ss-realm",
            clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "ss-frontend",
        });
    }
    return keycloakInstance;
};

export const keycloak = getKeycloak();
