import React, { FC } from "react";
import { Plus } from "lucide-react";

interface TabNavProps {
    tabs: Tab[];
    activeTabId: string;
    setActiveTabId: (id: string) => void;
    addNewTab: () => void;
    closeTab: (id: string) => void;
}

export interface Tab {
    id: string;
    name: string;
    content: () => React.ReactElement;
    isPinned?: boolean;
}

const TabNav: FC<TabNavProps> = ({ tabs, activeTabId, setActiveTabId, addNewTab, closeTab }) => {
    return (
        <div className="flex items-center space-x-4 border-b border-gray-200 mb-4">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={`px-4 py-2 cursor-pointer ${
                        tab.id === activeTabId
                            ? "border-b-2 border-blue-500 text-blue-500"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTabId(tab.id)}
                >
                    {tab.name}
                    {!tab.isPinned && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.id);
                            }}
                            className="ml-2 text-gray-400 hover:text-red-500"
                        >
                            ×
                        </button>
                    )}
                </div>
            ))}
            <button
                onClick={addNewTab}
                className="flex items-center px-4 py-2 text-gray-500 hover:text-blue-500 border-b-2 border-transparent"
            >
                <Plus className="h-4 w-4 mr-1" /> New Request
            </button>
        </div>
    );
};

export default TabNav;
