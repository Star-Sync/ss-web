import React from 'react';
import { useRouter } from 'next/router';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Header from '@/components/Header';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    const isHomepage = router.pathname === '/';

    return (
        <SidebarProvider>
            {!isHomepage && <AppSidebar />}
            <main className="w-screen h-screen">
                {!isHomepage && <Header />}
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;
