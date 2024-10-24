import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    return (
        <div className="flex flex-row h-screen">
            {/* Sidebar */}
            <Sidebar isCollapsed={isCollapsed} handleToggleSidebar={handleToggleSidebar} />

            {/* Content Section */}
            <div className="flex flex-col flex-grow overflow-auto">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="p-4 bg-gray-800 flex-grow overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
