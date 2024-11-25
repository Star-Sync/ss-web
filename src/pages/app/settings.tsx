import React, { useState } from "react";
import TabNavigation from "@/components/app/settings/TabNavigation";
import TabContent from "@/components/app/settings/TabContent";
import SettingsGeneral from "@/components/app/settings/settings-general";
import MotionWrapper from "@/components/app/MotionWrapper";
import Head from "next/head";

const tabs = [
    { name: "General", key: "general", Component: SettingsGeneral },
    { name: "Users", key: "users", Component: () => <div>User management settings content goes here.</div> },
    { name: "Analytics", key: "analytics", Component: () => <div>Analytics settings content goes here.</div> },
    { name: "Apps", key: "apps", Component: () => <div>Apps settings content goes here.</div> },
    { name: "Security", key: "security", Component: () => <div>Security settings content goes here.</div> },
    { name: "Billing", key: "billing", Component: () => <div>Billing settings content goes here.</div> },
    { name: "API", key: "api", Component: () => <div>API settings content goes here.</div> },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");

    const activeTabData = tabs.find((tab) => tab.key === activeTab);

    return (
        <>
            <Head>
                <title>Settings | Star-Sync</title>
            </Head>
            <MotionWrapper className="w-full h-full bg-gray-50 p-4 space-y-4">
                {/* Header Section */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                    <h1 className="text-2xl font-bold text-black">Settings</h1>
                    <h2 className="text-md text-gray-500 mb-3">
                        Manage your plan and billing history here.
                    </h2>
                    {/* Tab Navigation */}
                    <TabNavigation
                        tabs={tabs.map(({ name, key }) => ({ name, key }))}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                {/* Tab Content */}
                {activeTabData && (
                    <TabContent activeKey={activeTabData.key} Component={activeTabData.Component} />
                )}
            </MotionWrapper>
        </>
    );
};

export default Settings;
