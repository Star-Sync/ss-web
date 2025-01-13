// FormManager.tsx
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/app/MotionWrapper";
import SatelliteForm from "./SatelliteForm";

const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

const transition = { duration: 0.4, ease: "easeInOut" };

const FormManager: React.FC = () => {
    return (
        <MotionWrapper>
            <Tabs defaultValue="satellite" className="w-full">
                <TabsContent value="satellite">
                    <motion.div
                        className="w-full"
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                    >
                        <SatelliteForm />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </MotionWrapper>
    );
};

export default FormManager;