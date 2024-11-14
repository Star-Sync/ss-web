import React from 'react';

import WebFooter from '@/components/web/WebFooter';
import WebNavbar from "@/components/web/WebNavbar";


type LayoutProps = {
    children: React.ReactNode;
};

const WebLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <WebNavbar />
            <main>{children}</main>
            <WebFooter />
        </>
    );
};

export default WebLayout;
