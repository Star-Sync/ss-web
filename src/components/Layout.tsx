import React, { ReactNode} from 'react';
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/AppSidebar";
import Header from "@/components/Header";

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-screen h-screen">
                <Header/>
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;
