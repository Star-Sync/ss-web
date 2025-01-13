import React, { FC } from "react";
import { motion } from "framer-motion";
import { Tab } from "./TabNav";

interface TabContentProps {
    tabs: Tab[];
    activeTabId: string;
}

const TabContent: FC<TabContentProps> = ({ tabs, activeTabId }) => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    return (
        <div className="flex-grow relative">
            {activeTab ? (
                <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {activeTab.content}
                </motion.div>
            ) : (
                <div>No content available.</div>
            )}
        </div>
    );
};

export default TabContent;
