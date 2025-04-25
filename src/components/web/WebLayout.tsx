import React from 'react';

import WebNavbar from "@/components/web/WebNavbar";


type LayoutProps = {
    children: React.ReactNode;
};

const WebLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div>
                <WebNavbar />
                <main className="bg-white">{children}</main>
            </div>
     
        </>
    );
};

export default WebLayout;
