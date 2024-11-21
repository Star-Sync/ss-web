import React, { useEffect, useState } from "react";
import DashboardUpcoming from "@/components/app/dashboard/dashboard-upcoming";
import MotionWrapper from "@/components/app/MotionWrapper";
import MotionCardList from "@/components/app/dashboard/MotionCardList";
import DashboardGS from "@/components/app/dashboard/dashboard-gs";
import Head from "next/head";

type Card = {
    color: string;
    title: string;
    text: string;
};

const Dashboard: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const cards: Card[] = [
        { color: "bg-blue-500", title: "Scheduled Tasks", text: "Number of tasks scheduled today: 10" },
        { color: "bg-green-500", title: "Active Satellites", text: "Satellites in operation: 5" },
        { color: "bg-yellow-500", title: "Pending Requests", text: "Number of pending requests: 3" },
    ];

    return (
        <>
            <Head>
                <title>Dashboard | Star-Sync</title>
            </Head>
            <MotionWrapper
                className="w-full h-full flex flex-col bg-gray-50 p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Row 1: Overview */}
                <MotionWrapper
                    className="bg-white rounded-xl p-6 shadow-md mb-4"
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                >
                    <h2 className="text-2xl font-bold text-black">Overview</h2>
                    <p className="text-md text-gray-500 mb-4">Manage your plan and billing history here.</p>
                    <MotionCardList cards={cards} />
                </MotionWrapper>

                {/* Row 2: DashboardUpcoming and DashboardGS */}
                <div className="flex flex-grow gap-4 mt-4">
                    {/* DashboardUpcoming */}
                    <MotionWrapper className="w-1/2 min-h-[58vh] max-h-64 bg-white rounded-xl p-6 shadow-md">
                        <DashboardUpcoming />
                    </MotionWrapper>

                    {/* DashboardGS */}
                    <MotionWrapper className="w-1/2 min-h-[58vh] max-h-64 bg-white rounded-xl p-6 shadow-md">
                        <DashboardGS />
                    </MotionWrapper>
                </div>
            </MotionWrapper>
        </>

    );
};

export default Dashboard;
