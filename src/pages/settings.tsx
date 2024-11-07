import React, {useEffect, useState} from 'react';
import SettingsGeneral from "@/components/settings/settings-general";

// Tab data and dynamic import of components for each tab content
const tabs = [
    { name: "General", key: "general", Component: SettingsGeneral },
    { name: "Users", key: "users", Component: () => <div>User management settings content goes here.</div> },
    { name: "Analytics", key: "analytics", Component: () => <div>Analytics settings content goes here.</div> },
    { name: "Apps", key: "apps", Component: () => <div>Apps settings content goes here.</div> },
    { name: "Security", key: "security", Component: () => <div>Security settings content goes here.</div> },
    { name: "Billing", key: "billing", Component: () => <div>Billing settings content goes here.</div> },
    { name: "API", key: "api", Component: () => <div>API settings content goes here.</div> },
];

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState("general");
    // Find the active tab object
    const activeTabData = tabs.find((tab) => tab.key === activeTab);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className="w-full h-full bg-gray-50 p-4 space-y-4">
            {/* Heading Section */}
            <div className={`bg-white rounded-xl p-6 shadow-md ${isLoaded ? 'fade-in' : ''}`}>
                <h1 className="text-2xl font-bold text-black">Settings</h1>
                <h2 className="text-md text-gray-500 mb-3">Manage your plan and billing history here.</h2>

                {/* Tab Navigation */}
                <div className="flex space-x-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium ${
                                activeTab === tab.key
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

            </div>

            {/* Content Section for Active Tab */}
            <div className={`bg-white rounded-xl p-6 shadow-md ${isLoaded ? 'fade-in' : ''}`}>
                {activeTabData?.Component && <activeTabData.Component/>}
            </div>
        </section>
    );
};

export default Settings;
