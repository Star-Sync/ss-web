import React from "react";
import { motion, MotionProps } from "framer-motion";

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
    initial?: MotionProps["initial"];
    animate?: MotionProps["animate"];
    transition?: MotionProps["transition"];
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
                                                         children,
                                                         className,
                                                         initial = { opacity: 0, y: 10 },
                                                         animate = { opacity: 1, y: 0 },
                                                         transition = { duration: 0.5 },
                                                     }) => {
    return (
        <motion.div
            className={className}
            initial={initial}
            animate={animate}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
