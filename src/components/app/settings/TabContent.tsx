import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabContentProps {
    activeKey: string;
    Component: React.FC;
}

const TabContent: React.FC<TabContentProps> = ({ activeKey, Component }) => {
    const containerVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeKey}
                className="bg-white rounded-xl p-6 shadow-md"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Component />
            </motion.div>
        </AnimatePresence>
    );
};

export default TabContent;
