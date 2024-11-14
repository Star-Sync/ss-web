import React from "react";

interface TabNavigationProps {
    tabs: { name: string; key: string }[];
    activeTab: string;
    onTabChange: (tabKey: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
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
    );
};

export default TabNavigation;
