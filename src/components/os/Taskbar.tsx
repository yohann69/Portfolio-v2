"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, FolderOpen, Clock, Image as ImageIcon, MessageSquare, Settings } from 'lucide-react';
import { useWindowManager, AppId } from './WindowManager';
import { cn } from '@/utils/cn';

const apps = [
    { id: 'system-info', icon: Terminal, label: 'System Info' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'experience', icon: Clock, label: 'Timeline' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'messenger', icon: MessageSquare, label: 'Contact' },
    // { id: 'settings', icon: Settings, label: 'Settings' },
] as const;

export const Taskbar = () => {
    const { windows, openWindow, activeWindowId } = useWindowManager();

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-end gap-4 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl">
                {apps.map((app) => {
                    const isOpen = windows[app.id].isOpen;
                    const isActive = activeWindowId === app.id;
                    const Icon = app.icon;

                    return (
                        <button
                            key={app.id}
                            onClick={() => openWindow(app.id)}
                            className="group relative flex flex-col items-center gap-1"
                        >
                            {/* Tooltip */}
                            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/80 text-white px-2 py-1 rounded border border-white/10 whitespace-nowrap pointer-events-none">
                                {app.label}
                            </span>

                            {/* Icon Container */}
                            <motion.div
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                    isActive ? "bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "bg-white/5 hover:bg-white/10",
                                    isOpen && !isActive ? "border-b-2 border-white/50" : ""
                                )}
                            >
                                <Icon className={cn("w-6 h-6", isActive ? "text-white" : "text-white/70")} />
                            </motion.div>

                            {/* Active Dot */}
                            <div className={cn(
                                "w-1 h-1 rounded-full bg-white transition-all duration-300",
                                isOpen ? "opacity-100" : "opacity-0"
                            )} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
