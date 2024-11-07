import React, { useState } from 'react';
import SettingsGeneral from "@/components/app/settings/settings-general";
import { motion, AnimatePresence } from 'framer-motion';

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

    const handleTabChange = (tabKey: string) => {
        if (tabKey === activeTab) return;
        setActiveTab(tabKey);
    };

    // Animation settings
    const containerVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, staggerChildren: 0.1 },
        },
        exit: { opacity: 0, y: 10 },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 },
    };

    return (
        <motion.section
            className="w-full h-full bg-gray-50 p-4 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Heading Section */}
            <motion.div className="bg-white rounded-xl p-6 shadow-md">
                <h1 className="text-2xl font-bold text-black">Settings</h1>
                <h2 className="text-md text-gray-500 mb-3">Manage your plan and billing history here.</h2>

                {/* Tab Navigation */}
                <div className="flex space-x-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key)}
                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.key
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Animated Container for Active Tab */}
            <AnimatePresence mode="wait">
                {activeTabData && (
                    <motion.div
                        key={activeTabData.key}
                        className="bg-white rounded-xl p-6 shadow-md relative"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.div variants={itemVariants}>
                            <activeTabData.Component />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Settings;
