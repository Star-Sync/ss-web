import React from 'react';
import {Separator} from "@/components/ui/separator";

const Settings: React.FC = () => {
    return (
        <section className="w-full h-full bg-gray-100 p-4">
            <div className="ml-12">
                <h1 className="text-2xl font-bold text-black">Settings</h1>
                <h2 className="text-md text-black">Manage and personalize settings</h2>
                <Separator className="text-black"/>
            </div>
        </section>
    );
};

export default Settings;
