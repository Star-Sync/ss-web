import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "./keycloak";
import { ReactNode } from "react";
import Keycloak from "keycloak-js";

interface KeycloakProviderProps {
    children: ReactNode;
}

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
    const silentCheckSsoRedirectUri =
        typeof window !== "undefined"
            ? `${window.location.origin}/silent-check-sso.html`
            : "";

    return (
        <ReactKeycloakProvider
            authClient={keycloak as Keycloak}
            initOptions={{
                onLoad: "check-sso",
                checkLoginIframe: false,
                pkceMethod: "S256",
                silentCheckSsoRedirectUri,
            }}
        >
            {children}
        </ReactKeycloakProvider>
    );
};
