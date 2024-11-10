import React, { useEffect, useState } from "react";
import DashboardUpcoming from "@/components/app/dashboard/dashboard-upcoming";
import MotionWrapper from "@/components/app/dashboard/MotionWrapper";
import MotionCardList from "@/components/app/dashboard/MotionCardList";

const Dashboard: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const cards = [
        { color: "bg-blue-500", title: "Scheduled Tasks", text: "Number of tasks scheduled today: 10" },
        { color: "bg-green-500", title: "Active Satellites", text: "Satellites in operation: 5" },
        { color: "bg-yellow-500", title: "Pending Requests", text: "Number of pending requests: 3" },
    ];

    return (
        <MotionWrapper
            className="w-full h-screen flex flex-col bg-gray-50 p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Overview Section */}
            <MotionWrapper className="bg-white rounded-xl p-6 shadow-md mb-4" animate={{ opacity: isLoaded ? 1 : 0 }}>
                <h2 className="text-2xl font-bold text-black">Overview</h2>
                <h2 className="text-md text-gray-500 mb-4">
                    Manage your plan and billing history here.
                </h2>
                <MotionCardList cards={cards} />
            </MotionWrapper>

            {/* DashboardUpcoming Section */}
            <MotionWrapper className="flex-grow flex">
                <DashboardUpcoming className="h-1/2" />
            </MotionWrapper>
        </MotionWrapper>
    );
};

export default Dashboard;
