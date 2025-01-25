import React from "react";
import Head from "next/head";
import SatelliteContainer from "@/components/app/satellite/SatelliteContainer";

const SatellitePage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Satellite Dashboard | Star-Sync</title>
            </Head>
            <SatelliteContainer>
            </SatelliteContainer>
        </>

    );
};

export default SatellitePage;