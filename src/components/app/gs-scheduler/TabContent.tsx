import React, { FC } from "react";
import { motion } from "framer-motion";
import { Tab } from "@/components/ui/tab/TabNav";

interface TabContentProps {
    tabs: Tab[];
    activeTabId: string;
}

const TabContent: FC<TabContentProps> = ({ tabs, activeTabId }) => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    if (!activeTab) {
        return <div>No active tab found</div>;
    }

    return (
        <div className="flex-grow relative">
            <motion.div
                key={activeTab.id} // Use key to force re-mount on tab change
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", height: "100%", position: "relative" }}
            >
                {activeTab.content()}
            </motion.div>
        </div>
    );
};

export default TabContent;
