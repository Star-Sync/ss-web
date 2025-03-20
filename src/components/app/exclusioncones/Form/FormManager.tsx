// FormManager.tsx
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import MotionWrapper from "@/components/app/MotionWrapper";
import ExclusionForm from "./ExclusionForm";

const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

const transition = { duration: 0.4, ease: "easeInOut" };

const FormManager: React.FC = () => {
    return (
        <MotionWrapper>
            <Tabs defaultValue="exclusion" className="w-full">
                <TabsContent value="exclusion">
                    <motion.div
                        className="w-full"
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                    >
                        <ExclusionForm />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </MotionWrapper>
    );
};

export default FormManager;