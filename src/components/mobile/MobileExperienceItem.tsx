"use client";

import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
    id: number;
    date: string;
    endDate: string;
    title: string;
    company: string;
    type: 'work' | 'education' | 'event';
    description: string;
}

interface MobileExperienceItemProps {
    event: Event;
    index: number;
}

export function MobileExperienceItem({ event, index }: MobileExperienceItemProps) {
    const getIcon = () => {
        switch (event.type) {
            case 'work':
                return <Briefcase className="w-5 h-5 text-blue-400" />;
            case 'education':
                return <GraduationCap className="w-5 h-5 text-purple-400" />;
            default:
                return <MapPin className="w-5 h-5 text-green-400" />;
        }
    };

    const getColor = () => {
        switch (event.type) {
            case 'work':
                return 'border-blue-500/30 bg-blue-500/10';
            case 'education':
                return 'border-purple-500/30 bg-purple-500/10';
            default:
                return 'border-green-500/30 bg-green-500/10';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative pl-8"
        >
            {/* Timeline Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />
            
            {/* Timeline Dot */}
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-black shadow-lg flex items-center justify-center z-10">
                {getIcon()}
            </div>

            {/* Content Card */}
            <div className={`ml-4 border rounded-xl p-4 ${getColor()} backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-1 rounded-full">
                        {event.date} → {event.endDate}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                        {event.type}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                <p className="text-sm font-medium text-green-400 mb-3">@{event.company}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>
            </div>
        </motion.div>
    );
}

