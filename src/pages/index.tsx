import React from 'react';
import WebNavbar from "@/components/web/WebNavbar";
import WebHeader from "@/components/web/WebHeader";
import WebFooter from "@/components/web/WebFooter";
import { Article, Brand, CTA, Feature } from "@/components/web/WebPageExports";

const Home: React.FC = () => {
    return (
        <div className="App">
            <div className="gradient__bg">
                <WebNavbar />
                <WebHeader />
            </div>
            <Article />
            <Brand />
            <CTA />
            <Feature />
            <WebFooter />
        </div>
    );
};

export default Home;