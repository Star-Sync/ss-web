import React, { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tab } from "./TabNav";

interface TabContentProps {
    tabs: Tab[];
    activeTabId: string;
}

const TabContent: FC<TabContentProps> = ({ tabs, activeTabId }) => {
    return (
        <div className="flex-grow relative">
            <AnimatePresence mode="wait">
                {tabs.map((tab) => (
                    tab.id === activeTabId ? (
                        <motion.div
                            key={tab.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                position: 'absolute',
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {tab.content}
                        </motion.div>
                    ) : (
                        <div
                            key={`hidden-${tab.id}`}
                            style={{
                                position: 'absolute',
                                visibility: 'hidden',
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            {tab.content}
                        </div>
                    )
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TabContent;
