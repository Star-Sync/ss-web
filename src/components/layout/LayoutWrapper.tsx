// src/components/layouts/LayoutWrapper.tsx
import { useRouter } from "next/router";
import AppLayout from "./AppLayout";
import WebLayout from "./WebLayout";
import {KeycloakProvider} from "@/auth/keycloakprovider";

interface LayoutWrapperProps {
    children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
    const router = useRouter();

    // Protected app routes
    if (router.pathname.startsWith("/app")) {
        return (
            <KeycloakProvider>
                <AppLayout>{children}</AppLayout>
            </KeycloakProvider>
        );
    }
    // Public web routes (no KeycloakProvider needed)
    return <WebLayout>{children}</WebLayout>;
};

export default LayoutWrapper;
