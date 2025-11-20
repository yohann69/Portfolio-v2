"use client";

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Search } from 'lucide-react';

export const TopBar = () => {
    const [time, setTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-40 select-none text-xs font-medium text-white/80">
            <div className="flex items-center gap-4">
                <span className="font-bold hover:text-white cursor-pointer">Portfolio OS</span>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors">
                    <span>File</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors">
                    <span>Edit</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-0.5 rounded hover:bg-white/10 cursor-pointer transition-colors">
                    <span>View</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-2">
                    <Wifi className="w-3.5 h-3.5" />
                    <Volume2 className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                </div>
                <span className="px-2">{time}</span>
            </div>
        </div>
    );
};
