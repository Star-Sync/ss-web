import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardUpcoming from "@/components/app/dashboard/dashboard-upcoming";

const Dashboard: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <motion.section
            className="w-full h-full bg-gray-50 p-4 space-y-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="bg-white rounded-xl p-6 shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-black">Overview</h2>
                <h2 className="text-md text-gray-500 mb-4">Manage your plan and billing history here.</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {[
                            { color: "bg-blue-500", title: "Scheduled Tasks", text: "Number of tasks scheduled today: 10" },
                            { color: "bg-green-500", title: "Active Satellites", text: "Satellites in operation: 5" },
                            { color: "bg-yellow-500", title: "Pending Requests", text: "Number of pending requests: 3" },
                        ].map((card, index) => (
                            <motion.div
                                key={card.title}
                                className={`${card.color} text-white p-4 rounded-lg shadow-md`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 * index, duration: 0.5 }}
                            >
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                                <p>{card.text}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Add DashboardUpcoming Component */}
            <motion.div
                className="bg-white my-2"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <h2 className="text-xl font-bold text-gray-900 grid-cols-1 grid-rows-1">Upcoming Missions</h2>
                    <DashboardUpcoming className="row-start-2"/>
                </div>

                {/*<h2 className="text-xl font-bold text-gray-900 p-3">Upcoming Missions</h2>*/}

            </motion.div>
        </motion.section>
    );
};

export default Dashboard;