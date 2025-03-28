import React, { useEffect, useState } from "react";
import MotionWrapper from "@/components/app/MotionWrapper";
import MotionCardList from "@/components/app/dashboard/MotionCardList";
import Head from "next/head";

type Card = {
    color: string;
    title: string;
    text: string;
};

const ManageUsers: React.FC = () => {
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
            
        </>

    );
};

export default ManageUsers;