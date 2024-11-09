import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/app/ui/button";
import { ScrollArea } from "@/components/app/ui/scroll-area";

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

// Dummy mission data
const missions = [
    {
        id: 1,
        title: "Earth Observation (RADARSAT-2)",
        location: "South America",
        duration: "2 Hours",
        date: "November 20",
        color: "bg-green-200",
    },
    {
        id: 2,
        title: "Earth Observation (RADARSAT-2)",
        location: "North America",
        duration: "3 Hours 30 Minutes",
        date: "November 20",
        color: "bg-red-200",
    },
    {
        id: 3,
        title: "Earth Observation (RADARSAT-2)",
        location: "Asia",
        duration: "4 Hours 30 Minutes",
        date: "November 20",
        color: "bg-blue-200",
    },
    {
        id: 4,
        title: "Earth Observation (RADARSAT-2)",
        location: "Asia",
        duration: "4 Hours 30 Minutes",
        date: "November 20",
        color: "bg-blue-200",
    },
];

const DashboardUpcoming: React.FC = () => {
    const [activeMission, setActiveMission] = useState(missions[0]);

    return (
            <div className="w-full max-w-lg mx-auto justify-left bg-white">
                <ScrollArea className="h-64 rounded-md border">
                    <div className={"p-2"}>
                        {missions.map((mission) => (
                            <div
                                key={mission.id}
                                className={`h-16 flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 ${mission.id === activeMission.id ? "bg-gray-200" : ""
                                }`}
                                onClick={() => setActiveMission(mission)}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${mission.color}`}
                                >
                                    <motion.div whileHover={{ scale: 1.1 }}>
                                        {/* Example mission icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-6 h-6 text-gray-900"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3.98 8.17c.49-.88.99-1.75 1.48-2.62a.375.375 0 01.33-.22h12.42c.14 0 .26.08.33.22.5.87.99 1.74 1.48 2.62M4.97 6h14.06M7 12h10M7 16h10M7 20h10"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-900">{mission.title}</h3>
                                    <p className="text-sm text-gray-900">{mission.location}</p>
                                    <p className="text-sm text-gray-900">{mission.duration}</p>
                                </div>
                                <div className="ml-auto text-sm text-gray-900">{mission.date}</div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <AnimatePresence mode="wait">
                    {activeMission && (
                        <motion.div
                            key={activeMission.id}
                            className="bg-gray-50 rounded-lg p-4 shadow-md"
                            variants={containerVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <motion.div variants={itemVariants}>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">{activeMission.title}</h3>
                                <p className="text-sm text-gray-900">
                                    Location: {activeMission.location}
                                </p>
                                <p className="text-sm text-gray-900">Duration: {activeMission.duration}</p>
                                <p className="text-sm text-gray-900">Date: {activeMission.date}</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
    );

};

export default DashboardUpcoming;
