"use client";

import React from 'react';
import { WindowManagerProvider } from './WindowManager';
import { Taskbar } from './Taskbar';
import { TopBar } from './TopBar';
import { Window } from './Window';
import SystemInfo from './apps/SystemInfo';
import ProjectsExplorer from './apps/ProjectsExplorer';
import ExperienceLog from './apps/ExperienceLog';
import Gallery from './apps/Gallery';
import Messenger from './apps/Messenger';

export const Desktop = () => {
    return (
        <WindowManagerProvider>
            <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans selection:bg-white/20">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#000] to-black" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
                </div>

                {/* OS Interface */}
                <div className="relative z-10 w-full h-full">
                    <TopBar />

                    {/* Windows Area */}
                    <div className="absolute inset-0 top-8 bottom-20 pointer-events-none">
                        {/* Pointer events auto on windows to allow clicking through to desktop if needed, 
                 but windows themselves need pointer-events-auto */}
                        <div className="w-full h-full pointer-events-auto">
                            <Window id="system-info" initialPosition={{ x: 100, y: 100 }}>
                                <SystemInfo />
                            </Window>
                            <Window id="projects" initialPosition={{ x: 150, y: 80 }} initialSize={{ width: 900, height: 700 }}>
                                <ProjectsExplorer />
                            </Window>
                            <Window id="experience" initialPosition={{ x: 200, y: 120 }}>
                                <ExperienceLog />
                            </Window>
                            <Window id="gallery" initialPosition={{ x: 250, y: 150 }} initialSize={{ width: 800, height: 600 }}>
                                <Gallery />
                            </Window>
                            <Window id="messenger" initialPosition={{ x: 300, y: 180 }} initialSize={{ width: 400, height: 600 }}>
                                <Messenger />
                            </Window>
                        </div>
                    </div>

                    <Taskbar />
                </div>
            </div>
        </WindowManagerProvider>
    );
};
