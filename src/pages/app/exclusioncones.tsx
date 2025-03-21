import React from "react";
import Head from "next/head";
import ExclusionContainer from "@/components/app/exclusioncones/ExclusionContainer";

const ExclusionConesPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Ex-Cones Dashboard | Star-Sync</title>
            </Head>
            <ExclusionContainer>
            </ExclusionContainer>
        </>

    );
};

export default ExclusionConesPage;