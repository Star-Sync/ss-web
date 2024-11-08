import React from 'react';
import { useRouter } from 'next/router';
import { SidebarProvider } from '@/components/app/ui/sidebar';
import { AppSidebar } from '@/components/app/AppSidebar';
import AppHeader from '@/components/app/AppHeader';


type LayoutProps = {
    children: React.ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const isHomepage = router.pathname === '/';

    return (
        <SidebarProvider>
            {!isHomepage && <AppSidebar />}
            <main className="w-screen h-screen bg-white">
                {!isHomepage && <AppHeader />}
                {children}
            </main>
        </SidebarProvider>
    );
};

export default AppLayout;
