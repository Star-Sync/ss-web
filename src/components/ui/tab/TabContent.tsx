import React, { FC } from "react";
import { motion } from "framer-motion";
import { Tab } from "./TabNav";

interface TabContentProps {
    tabs: Tab[];
    activeTabId: string;
}

const TabContent: FC<TabContentProps> = ({ tabs, activeTabId }) => {
    return (
        <div className="flex-grow relative">
            {tabs.map((tab) => (
                <motion.div
                    key={tab.id}
                    initial={false}
                    animate={tab.id === activeTabId ? "active" : "inactive"}
                    variants={{
                        active: { opacity: 1, x: 0, position: "relative" },
                        inactive: { opacity: 0, x: -20, position: "absolute" },
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {tab.content()}
                </motion.div>
            ))}
        </div>
    );
};

export default TabContent;
