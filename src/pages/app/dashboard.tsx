import React, { useEffect, useState } from "react";
import DashboardUpcoming from "@/components/app/dashboard/dashboard-upcoming";
import MotionWrapper from "@/components/app/MotionWrapper";
import MotionCardList from "@/components/app/dashboard/MotionCardList";
import DashboardGS from "@/components/app/dashboard/dashboard-gs";
import Head from "next/head";
import { Separator } from "@/components/ui/separator";

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
                className="flex flex-col gap-4 p-4 bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Row 1: Overview */}
                <MotionWrapper
                    className="bg-white rounded-xl p-6 shadow-md"
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                >
                    <h2 className="text-2xl font-bold w-screen">Overview</h2>
                    <p className="text-md text-gray-500 mb-4">Manage your plan and billing history here.</p>
                    <MotionCardList cards={cards} />
                </MotionWrapper>

                {/* Row 2: DashboardUpcoming and DashboardGS */}
                <div className="flex gap-4 flex-grow mt-4">
                    {/* DashboardUpcoming */}
                    <MotionWrapper className="flex-1 bg-white rounded-xl shadow-md p-4">
                        <DashboardUpcoming />
                    </MotionWrapper>

                    {/* DashboardGS */}
                    <MotionWrapper className="flex-1 bg-white rounded-xl shadow-md p-4">
                        <DashboardGS />
                    </MotionWrapper>
                </div>
            </MotionWrapper>
        </>
    );
};

export default Dashboard;
