import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const [formType, setFormType] = useState<"contact" | "rf">("contact");

    return (
        <MotionWrapper>
            {/* Toggle buttons */}
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 rounded ${
                        formType === "contact"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                    aria-pressed={formType === "contact"}
                    onClick={() => setFormType("contact")}
                >
                    Contact Request
                </button>
                <button
                    className={`px-4 py-2 rounded ${
                        formType === "rf"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    }`}
                    aria-pressed={formType === "rf"}
                    onClick={() => setFormType("rf")}
                >
                    RF Request
                </button>
            </div>

            {/* Form Content with Animated Transitions */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {formType === "contact" && (
                        <motion.div
                            key="contact"
                            className="absolute w-full"
                            variants={formVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={transition}
                        >
                            <ContactRequestForm location={location} />
                        </motion.div>
                    )}
                    {formType === "rf" && (
                        <motion.div
                            key="rf"
                            className="absolute w-full"
                            variants={formVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={transition}
                        >
                            <RFRequestForm location={location} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MotionWrapper>
    );
};

export default RequestForm;
