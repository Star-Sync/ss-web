// File: src/components/app/gs-scheduler/GSScheduler.tsx
import React from "react";
import GSContainer from "@/components/app/gs-scheduler/GSContainer";
import Head from "next/head";

const GSScheduler: React.FC = () => {
    return (
        <>
            <Head>
                <title>Ground-Station Scheduler | Star-Sync</title>
            </Head>
            <GSContainer>
            </GSContainer>
        </>

    );
};

export default GSScheduler;
