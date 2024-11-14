import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';

type LayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="mx-auto w-full bg-white">
                <AppHeader />
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;
