import React from 'react';
import WebHeader from "@/components/web/WebHeader";
import { Article, Brand, CTA, Feature } from "@/components/web/WebPageExports";

const Home: React.FC = () => {
    return (
        <div className="App">
            <div className="gradient__bg">
                <WebHeader />
            </div>
            <Article />
            <Brand />
            <CTA />
            <Feature />
        </div>
    );
};

export default Home;