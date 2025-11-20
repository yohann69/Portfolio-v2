"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useWindowManager, AppId } from './WindowManager';
import { cn } from '@/utils/cn';

interface WindowProps {
    id: AppId;
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number; height: number };
}

export const Window = ({ id, children, initialPosition = { x: 50, y: 50 }, initialSize = { width: 800, height: 600 } }: WindowProps) => {
    const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowManager();
    const windowState = windows[id];
    const dragControls = useDragControls();

    const [isMobile, setIsMobile] = useState(false);
    const [size, setSize] = useState(initialSize);
    const [position, setPosition] = useState(initialPosition);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle resizing
    const resizeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            setSize(prev => ({
                width: Math.max(400, prev.width + e.movementX),
                height: Math.max(300, prev.height + e.movementY)
            }));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    if (!windowState.isOpen) return null;

    const isFullScreen = windowState.isMaximized || isMobile;

    return (
        <motion.div
            drag={!isFullScreen}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragConstraints={{ top: 32 }}
            dragElastic={0}
            initial={{
                opacity: 0,
                scale: 0.95,
                x: isMobile ? 0 : initialPosition.x,
                y: isMobile ? 0 : initialPosition.y
            }}
            animate={{
                opacity: windowState.isMinimized ? 0 : 1,
                scale: windowState.isMinimized ? 0.8 : 1,
                x: isFullScreen ? 0 : undefined, // Let motion handle drag position when not fullscreen
                y: isFullScreen ? 0 : undefined,
                width: isFullScreen ? '100vw' : size.width,
                height: isFullScreen ? '100vh' : size.height,
                borderRadius: isFullScreen ? 0 : '12px',
            }}
            transition={{ duration: 0.2 }}
            style={{
                zIndex: windowState.zIndex,
                position: isFullScreen ? 'fixed' : 'absolute',
                top: isFullScreen ? 0 : undefined, // When not fullscreen, motion handles top/left via x/y
                left: isFullScreen ? 0 : undefined,
            }}
            className={cn(
                "flex flex-col bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden",
                isFullScreen ? "inset-0" : ""
            )}
            onPointerDown={() => focusWindow(id)}
        >
            {/* Window Title Bar */}
            <div
                className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-4 select-none cursor-default"
                onPointerDown={(e) => {
                    if (!isFullScreen) {
                        dragControls.start(e);
                        focusWindow(id);
                    }
                }}
            >
                <div className="flex items-center gap-2 group">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); closeWindow(id); }}>
                        <X className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}>
                        <Minus className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center cursor-pointer" onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}>
                        <Maximize2 className="w-2 h-2 text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
                <span className="text-xs font-medium text-white/60">{windowState.title}</span>
                <div className="w-10" /> {/* Spacer for centering */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>

            {/* Resize Handle */}
            {!isFullScreen && (
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        setIsResizing(true);
                    }}
                >
                    <svg viewBox="0 0 10 10" className="w-full h-full text-white/30">
                        <path d="M 8 2 L 8 8 L 2 8" fill="none" stroke="currentColor" strokeWidth="1" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};
