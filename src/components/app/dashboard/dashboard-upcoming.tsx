import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { missions } from "@/api/mission-overview";
import { Satellite } from "lucide-react";

// Framer motion variants
const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const itemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
};

interface DashboardUpcomingProps {
    className?: string;
}

const DashboardUpcoming: React.FC<DashboardUpcomingProps> = ({ className }) => {
    const [activeMission, setActiveMission] = useState(missions[0]);

    return (
        <div className={`${className}`}>
            {/* Scrollable List */}
            <ScrollArea className="rounded-xl border p-4 bg-white h-96">
                <h2 className="text-xl font-bold text-gray-900 ml-3">
                    Upcoming Missions
                </h2>
                <div className="p-2">
                    {missions.map((mission) => (
                        <div
                            key={mission.id}
                            className={`mb-3 flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${
                                mission.id === activeMission.id ? "outline outline-blue-300" : ""
                            }`}
                            onClick={() => setActiveMission(mission)}
                        >
                            {/* Icon */}
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${mission.color}`}
                            >
                                <Satellite color="#ffffff" size="100%" />
                            </div>

                            {/* Mission Details */}
                            <div className="ml-4">
                                <h3 className="font-semibold text-gray-900">
                                    {mission.title}
                                </h3>
                                <p className="text-sm text-gray-900">{mission.location}</p>
                                <p className="text-sm text-gray-900">{mission.duration}</p>
                            </div>

                            {/* Date */}
                            <div className="ml-auto -mt-2 flex flex-col items-center text-gray-900">
                                <span className="text-xs font-semibold">
                                    {mission.date.split(" ")[0]}
                                </span>
                                <div
                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-sm font-bold"
                                >
                                    {mission.date.split(" ")[1].replace(",", "")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Mission Details */}
            <AnimatePresence mode="wait">
                {activeMission && (
                    <motion.div
                        key={activeMission.id}
                        className="bg-gray-50 rounded-lg p-4 shadow-md mt-4"
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="font-bold text-lg mb-2 text-gray-900">
                                {activeMission.title}
                            </h3>
                            <p className="text-sm text-gray-900">
                                Location: {activeMission.location}
                            </p>
                            <p className="text-sm text-gray-900">
                                Duration: {activeMission.duration}
                            </p>
                            <p className="text-sm text-gray-900">Date: {activeMission.date}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardUpcoming;
