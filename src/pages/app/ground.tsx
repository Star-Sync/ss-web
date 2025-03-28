import React from "react";
import Head from "next/head";
import GroundContainer from "@/components/app/ground/GroundContainer";  

const GroundPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Ground Station Dashboard | Star-Sync</title> {}
            </Head>
            <GroundContainer>
            </GroundContainer>
        </>
    );
};

export default GroundPage;
