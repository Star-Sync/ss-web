import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { locations } from "@/api/gs-locations";
import RFRequestForm from "./RFRequestForm";
import ContactRequestForm from "./ContactRequestForm";
import MotionWrapper from "@/components/app/MotionWrapper";

interface RequestFormProps {
    location: typeof locations[0];
}

const formVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

const transition = { duration: 0.4, ease: "easeInOut" };

const RequestForm: React.FC<RequestFormProps> = ({ location }) => {
    return (
        <MotionWrapper>
            <Tabs defaultValue="contact" className="w-full">
                {/* Tabs List */}
                <TabsList className="mb-4">
                    <TabsTrigger value="contact">Contact Request</TabsTrigger>
                    <TabsTrigger value="rf">RF Request</TabsTrigger>
                </TabsList>

                {/* Tabs Content */}
                <TabsContent value="contact">
                    <motion.div
                        className="w-full"
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                    >
                        <ContactRequestForm location={location}/>
                    </motion.div>
                </TabsContent>
                <TabsContent value="rf">
                    <motion.div
                        className="w-full"
                        variants={formVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                    >
                        <RFRequestForm location={location} />
                    </motion.div>
                </TabsContent>
            </Tabs>
        </MotionWrapper>
    );
};

export default RequestForm;