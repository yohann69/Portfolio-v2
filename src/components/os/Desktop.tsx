"use client";

import React from 'react';
import { WindowManagerProvider } from './WindowManager';
import { SettingsProvider } from '@/context/SettingsContext';
import { Taskbar } from './Taskbar';
import { TopBar } from './TopBar';
import { Window } from './Window';
import SystemInfo from './apps/SystemInfo';
import ProjectsExplorer from './apps/ProjectsExplorer';
import ExperienceLog from './apps/ExperienceLog';
import Gallery from './apps/Gallery';
import Messenger from './apps/Messenger';
import SnakeGame from './apps/SnakeGame';
import Settings from './apps/Settings';
import About from './apps/About';
import Browser from './apps/Browser';
import PDFViewer from './apps/PDFViewer';
import VideoPlayer from './apps/VideoPlayer';
import TextEditor from './apps/TextEditor';
import { AnimatedBackground } from '../ui/animated-background';
import { FileSystemProvider } from '@/context/FileSystemContext';
import { useSettings } from '@/context/SettingsContext';
import { BootScreen } from './BootScreen';
import { AnimatePresence, motion } from 'framer-motion';

const DesktopContent = () => {
    const { bgPreset, theme } = useSettings();
    const [isBooting, setIsBooting] = React.useState(true);

    return (
        <>
            <AnimatePresence>
                {isBooting && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[9999]"
                    >
                        <BootScreen onComplete={() => setIsBooting(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans selection:bg-white/20">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <AnimatedBackground preset={bgPreset} theme={theme} />
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
                            <Window id="snake" initialPosition={{ x: 350, y: 200 }} initialSize={{ width: 400, height: 440 }}>
                                <SnakeGame />
                            </Window>
                            <Window id="settings" initialPosition={{ x: 400, y: 150 }} initialSize={{ width: 700, height: 500 }}>
                                <Settings />
                            </Window>
                            <Window id="about" initialPosition={{ x: 500, y: 250 }} initialSize={{ width: 400, height: 350 }}>
                                <About />
                            </Window>
                            <Window id="browser" initialPosition={{ x: 100, y: 100 }} initialSize={{ width: 1000, height: 700 }}>
                                <Browser />
                            </Window>
                            <Window id="pdf-viewer" initialPosition={{ x: 150, y: 100 }} initialSize={{ width: 800, height: 900 }}>
                                <PDFViewer />
                            </Window>
                            <Window id="video-player" initialPosition={{ x: 200, y: 150 }} initialSize={{ width: 800, height: 600 }}>
                                <VideoPlayer />
                            </Window>
                            <Window id="text-editor" initialPosition={{ x: 250, y: 200 }} initialSize={{ width: 600, height: 400 }}>
                                <TextEditor />
                            </Window>
                        </div>
                    </div>                        <Taskbar />
                </div>
            </div>
        </>
    );
};

export const Desktop = () => {
    return (
        <SettingsProvider>
            <FileSystemProvider>
                <WindowManagerProvider>
                    <DesktopContent />
                </WindowManagerProvider>
            </FileSystemProvider>
        </SettingsProvider>
    );
};
