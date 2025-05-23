import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';
import {Toaster} from "@/components/ui/toaster";

type LayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="bg-gray-50 overflow-hidden">
                <AppHeader />
                <Toaster />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;
