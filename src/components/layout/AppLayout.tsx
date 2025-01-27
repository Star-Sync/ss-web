// src/components/layout/AppLayout.tsx
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';
import { Toaster } from "@/components/ui/toaster";
import {AuthGuard} from "@/auth/authguard";

type LayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
            <AuthGuard>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="mx-auto w-full bg-white">
                        <AppHeader />
                        <Toaster />
                        {children}
                    </main>
                </SidebarProvider>
            </AuthGuard>
    );
};

export default AppLayout;
