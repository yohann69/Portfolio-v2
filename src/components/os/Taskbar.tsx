"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Terminal, FolderOpen, Clock, Image as ImageIcon, MessageSquare, Settings, Gamepad2 } from 'lucide-react';
import { useWindowManager, AppId } from './WindowManager';
import { cn } from '@/utils/cn';

const apps = [
    { id: 'system-info', icon: Terminal, label: 'System Info' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'experience', icon: Clock, label: 'Timeline' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'messenger', icon: MessageSquare, label: 'Contact' },
    // { id: 'settings', icon: Settings, label: 'Settings' },
    // { id: 'snake', icon: Gamepad2, label: 'Snake' }, // Easter egg app
] as const;

function DockIcon({ mouseX, app, isOpen, isActive, onClick }: { mouseX: MotionValue, app: any, isOpen: boolean, isActive: boolean, onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square flex flex-col items-center justify-center gap-1 relative group cursor-pointer"
            onClick={onClick}
        >
            {/* Tooltip */}
            <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-white/90 dark:bg-[#1e1e1e]/90 text-black dark:text-white px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 whitespace-nowrap pointer-events-none shadow-xl backdrop-blur-md">
                {app.label}
            </span>

            {/* Icon Container */}
            <div className={cn(
                "w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-lg",
                "border-black/10 dark:border-white/10",
                isActive
                    ? "bg-black/10 dark:bg-white/20 backdrop-blur-md border-black/20 dark:border-white/30"
                    : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm"
            )}>
                <app.icon className={cn("w-1/2 h-1/2", isActive ? "text-black dark:text-white" : "text-black/80 dark:text-white/80")} />
            </div>

            {/* Active Dot */}
            <div className={cn(
                "absolute -bottom-2 w-1 h-1 rounded-full bg-black dark:bg-white transition-all duration-300",
                isOpen ? "opacity-100" : "opacity-0"
            )} />
        </motion.div>
    );
}

export const Taskbar = () => {
    const { windows, openWindow, activeWindowId } = useWindowManager();
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-3 px-4 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10 rounded-3xl shadow-2xl"
            >
                {apps.map((app) => (
                    <DockIcon
                        key={app.id}
                        mouseX={mouseX}
                        app={app}
                        isOpen={windows[app.id].isOpen}
                        isActive={activeWindowId === app.id}
                        onClick={() => openWindow(app.id)}
                    />
                ))}
            </motion.div>
        </div>
    );
};
