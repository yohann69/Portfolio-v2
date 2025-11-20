"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
    onComplete: () => void;
}

export const BootScreen = ({ onComplete }: BootScreenProps) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate boot loading time
        const totalTime = 2500; // 2.5 seconds total boot time
        const intervalTime = 50;
        const steps = totalTime / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);

            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 500);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center text-white cursor-none">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-24"
            >
                <svg viewBox="0 0 24 24" className="w-24 h-24 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <path d="m18 16 4-4-4-4" />
                    <path d="m6 8-4 4 4 4" />
                    <path d="m14.5 4-5 16" />
                </svg>
            </motion.div>

            <div className="w-56 h-1.5 bg-[#333] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                />
            </div>
        </div>
    );
};
