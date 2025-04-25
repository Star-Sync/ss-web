import React from 'react';
import WebHeader from "@/components/web/WebHeader";
import { Particles } from "@/components/ui/particles";
import Image from "next/image";
import logo from "@/assets/web/ss-logo-full.png";   
import MotionWrapper from '@/components/app/MotionWrapper';
import { motion } from 'framer-motion';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useRouter } from 'next/router';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { QuestionMarkCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
    const router = useRouter();
    
    const handleStartScheduling = () => {
        router.push('/dashboard');
    };

    const navigateToFAQ = () => {
        router.push('/faq');
    };

    const navigateToUserGuide = () => {
        router.push('/userguide');
    };
    
    return (
        <div className="flex flex-col h-[calc(100vh-110px)]">
            <WebHeader />
            <main className="relative flex-1 flex items-center justify-center overflow-hidden">
                <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color="#000000"
                    refresh
                />
                <div className="relative z-10 flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image src={logo} alt="Logo" width={200} height={200} />
                    </motion.div>
                    <MotionWrapper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.3,
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}
                    >
                        <h1 className="text-3xl font-bold mt-4 text-center">Satellite Scheduler for the Modern Era</h1>
                        <p className="text-lg mt-2 text-center">Schedule your satellites with ease</p>
                    </MotionWrapper>
                    <MotionWrapper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 2, 
                            delay: 0.3,
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}
                    >
                        <RainbowButton className="mt-4" onClick={handleStartScheduling}>Start Scheduling</RainbowButton>
                    </MotionWrapper>

                    <MotionWrapper
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                            duration: 0.8, 
                            delay: 0.6,
                            ease: [0.25, 0.1, 0.25, 1.0]
                        }}
                    >
                        <Dock className="mt-8 bg-white/5 border-white/10">
                            <DockIcon onClick={navigateToFAQ} className="bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                                <QuestionMarkCircleIcon className="w-6 h-6 text-blue-500" />
                            </DockIcon>
                            <DockIcon onClick={navigateToUserGuide} className="bg-purple-500/10 hover:bg-purple-500/20 transition-colors">
                                <BookOpenIcon className="w-6 h-6 text-purple-500" />
                            </DockIcon>
                        </Dock>
                    </MotionWrapper>
                </div>
            </main>
        </div>
    );
};

export default Home;