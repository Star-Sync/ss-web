import React, { useState, useEffect, useCallback } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import TimezoneClock from "@/components/ui/timezoneclock";
import { motion, useAnimation } from 'framer-motion';

const AppHeader: React.FC = () => {
    const [hover, setHover] = useState<boolean>(false);
    const [clockOpen, setClockOpen] = useState<boolean>(false);
    const controls = useAnimation();

    const adjustOpacity = useCallback(() => {
        if (clockOpen || hover) {
            controls.start({ opacity: 1 });
        } else {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 300, 0.5);
            controls.start({ opacity: newOpacity });
        }
    }, [clockOpen, hover, controls]);

    useEffect(() => {
        adjustOpacity();
    }, [clockOpen, hover, adjustOpacity]);

    useEffect(() => {
        const handleScroll = () => {
            adjustOpacity();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [adjustOpacity]);

    return (
        <motion.header
            className="bg-white p-4 text-black sticky top-0 z-10"
            animate={controls}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            initial={{ opacity: 1 }}
        >
            <div className="relative flex items-center w-full header-content">
                {/* Left Side */}
                <div className="absolute left-0 flex items-center">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 ml-3" />
                </div>

                {/* Centered Timezone Clock */}
                <div className="mx-auto">
                    <TimezoneClock
                        open={clockOpen}
                        setOpen={setClockOpen}
                    />
                </div>
            </div>
        </motion.header>
    );
};

export default AppHeader;
