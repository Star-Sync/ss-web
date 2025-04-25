import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/app/MotionWrapper';

const UserGuide = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Content Section */}
          <div className="space-y-8">
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                User Guide
              </h1>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                Learn how to effectively use the scheduling platform to coordinate satellite and ground station operations.
                Our tools let you visualize timelines, track mission status, and automate your workflow — helping you deliver
                with precision from orbit to ground.
              </p>
            </MotionWrapper>

            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-blue-300 mb-4">
                Getting Started
              </h2>
              <ol className="space-y-4">
                {[
                  "Upon opening the app, users land on the home screen. New users can access the FAQ and User Guide for complete onboarding support.",
                  "Proceed to the login page to sign in using your username and password. First-time users can register with an email address for a smooth start.",
                  "After logging in, the landing overview page gives a snapshot of your workflow, including scheduled tasks, active satellites, and pending requests.",
                  "Visit the calendar view to explore all scheduled missions. Events are color-coded for clarity, and the zoom functionality allows precision viewing from minute-level to multi-year planning.",
                  "To schedule a new mission, fill out the intuitive mission creation form. Even complex missions can be set up in minutes and will instantly appear on the calendar.",
                  "Head to the ground station page to view, create, or manage ground stations. Each entry includes vital data like altitude and scientific capabilities.",
                  "Manage satellites on the satellite management page. You can add, edit, or remove satellites as needed using user-friendly forms.",
                ].map((text, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    className="flex items-start space-x-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
                      {idx + 1}
                    </span>
                    <span className="text-gray-500/90">{text}</span>
                  </motion.li>
                ))}
              </ol>
            </MotionWrapper>
          </div>

          {/* Video Guide Section */}
          <motion.div 
            className="relative w-full aspect-video bg-white rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 max-w-[96%] mx-auto">
              {videoError ? (
                <div className="text-gray-500 text-center p-4">
                  <p>Unable to load video.</p>
                  <p className="text-sm mt-2">Please try refreshing the page.</p>
                </div>
              ) : (
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoError(true)}
                >
                  <source src="/video/videodemo.mp4" type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;