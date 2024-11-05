import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";

const Header: React.FC = () => {
    return (
        <header className="bg-white p-4 text-black">
            <div className="flex items-center">
                <SidebarTrigger />
                <Separator orientation="vertical" className="h-6 ml-1" />
                <h1 className="text-2xl ml-2">Star Sync</h1>
            </div>
        </header>
    );
};

export default Header;
