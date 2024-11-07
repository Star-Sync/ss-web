import React, { useState, useEffect, useCallback } from 'react';
import { SidebarTrigger } from "@/components/app/ui/sidebar";
import { Separator } from "@/components/app/ui/separator";
import TimezoneClock from "@/components/app/ui/timezoneclock";

const AppHeader: React.FC = () => {
    const [opacity, setOpacity] = useState<number>(1);
    const [hover, setHover] = useState<boolean>(false);
    const [clockOpen, setClockOpen] = useState<boolean>(false); // Add this state

    const adjustOpacity = useCallback(() => {
        if (clockOpen || hover) {
            setOpacity(1);
        } else {
            const scrollY = window.scrollY;
            const newOpacity = Math.max(1 - scrollY / 300, 0.5);
            setOpacity(newOpacity);
        }
    }, [clockOpen, hover]);

    useEffect(() => {
        adjustOpacity();
    }, [clockOpen, hover, adjustOpacity]);

    useEffect(() => {
        const handleScroll = () => {
            adjustOpacity();
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [clockOpen, hover, adjustOpacity]);

    return (
        <header
            className="bg-white p-4 text-black sticky top-0 z-10"
            style={{ opacity }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
        </header>
    );
};

export default AppHeader;
