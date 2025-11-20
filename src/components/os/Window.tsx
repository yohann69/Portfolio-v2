"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowManager, AppId } from './WindowManager';
import { cn } from '@/utils/cn';

interface WindowProps {
    id: AppId;
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number | string; height: number | string };
}

export const Window = ({ id, children, initialPosition = { x: 50, y: 50 }, initialSize = { width: 800, height: 600 } }: WindowProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowManager();
    const windowState = windows[id];
    const dragControls = useDragControls();
    const constraintsRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!windowState.isOpen) return null;

    const isFullScreen = windowState.isMaximized || isMobile;

    return (
        <motion.div
            drag={!isFullScreen}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            initial={{
                opacity: 0,
                scale: 0.95,
                x: isMobile ? 0 : initialPosition.x,
                y: isMobile ? 0 : initialPosition.y
            }}
            animate={{
                opacity: windowState.isMinimized ? 0 : 1,
                scale: windowState.isMinimized ? 0.8 : 1,
                x: isFullScreen ? 0 : undefined,
                y: isFullScreen ? 0 : undefined,
                width: isFullScreen ? '100vw' : initialSize.width,
                height: isFullScreen ? '100vh' : initialSize.height,
                borderRadius: isFullScreen ? 0 : '12px',
            }}
            transition={{ duration: 0.2 }}
            style={{
                zIndex: windowState.zIndex,
                position: isFullScreen ? 'fixed' : 'absolute',
                top: isFullScreen ? 0 : undefined,
                left: isFullScreen ? 0 : undefined,
            }}
            className={cn(
                "flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden",
                isFullScreen ? "inset-0" : ""
            )}
            onPointerDown={() => focusWindow(id)}
        >
            {/* Window Title Bar */}
            <div
                className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none cursor-default"
                onPointerDown={(e) => {
                    dragControls.start(e);
                    focusWindow(id);
                }}
            >
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 hover:bg-red-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); closeWindow(id); }} />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50 hover:bg-yellow-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }} />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 hover:bg-green-500 transition-colors cursor-pointer" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }} />
                </div>
                <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{windowState.title}</span>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto relative custom-scrollbar">
                {children}
            </div>
        </motion.div>
    );
};
