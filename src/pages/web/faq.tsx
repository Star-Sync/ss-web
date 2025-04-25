import React from 'react';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/app/MotionWrapper';
import Image from 'next/image';

const FAQ = () => {
  const faqItems = [
    {
      question: "How do I create a new mission?",
      answer:
        "You can create a new mission from the calendar or the mission planning section. Just click 'Add Mission', fill in the required details, and our scheduler will assign the best time slot.",
    },
    {
      question: "Can I edit or cancel a scheduled mission?",
      answer:
        "Yes. Go to the mission in your calendar, then click on it to access edit or cancel options. Note that canceling close to the execution time may have restrictions.",
    },
    {
      question: "What happens if two missions conflict?",
      answer:
        "Our system automatically detects and flags conflicts. The algorithm is designed as to not schedule in conflicting missions.",
    },
    {
      question: "How do I add a new satellite or ground station?",
      answer:
        "Navigate to either the Satellite Management or Ground Station page, then click 'Add'. Enter your asset's details and save.",
    },
    {
      question: "Why can't I log in?",
      answer:
        "Double-check your email and password. If you're still having trouble, try resetting your password from the login screen. If problems persist, contact support.",
    },
    {
      question: "How do I report a bug or request a new feature?",
      answer:
        "Please email support directly. We value your input and prioritize fixes and features based on user feedback.",
    },
  ];

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
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                Have questions? We have answers. Whether you are new to the platform or a returning user,
                this section helps clarify the most common topics — from login issues to scheduling tips.
                Explore our quick answers to get the most out of your mission management tools.
              </p>
            </MotionWrapper>

            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                {faqItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                    className="p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-300 mb-2">{item.question}</h3>
                    <p className="text-gray-500/90">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </MotionWrapper>
          </div>

          {/* Image Section */}
          <motion.div
            className="relative w-full aspect-square bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/logo/ss-satellite-image.png"
                alt="Satellite Illustration"
                fill
                className="object-contain p-4"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;