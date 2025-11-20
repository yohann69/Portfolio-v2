"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Volume2, Search, Apple, Calendar as CalendarIcon, ChevronRight, Check } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBar = () => {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const { theme, setTheme, language, setLanguage } = useSettings();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
            if (showCalendar && !(event.target as Element).closest('.calendar-trigger')) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCalendar]);

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const MenuDropdown = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1 }}
            className={`absolute top-full left-0 mt-1 w-48 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 z-50 ${className}`}
        >
            {children}
        </motion.div>
    );

    const MenuItem = ({ label, shortcut, onClick, hasSubmenu, children }: { label: string, shortcut?: string, onClick?: () => void, hasSubmenu?: boolean, children?: React.ReactNode }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className="relative px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-default flex items-center justify-between group text-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
            >
                <span>{label}</span>
                {shortcut && <span className="text-white/40 group-hover:text-white/80 ml-4">{shortcut}</span>}
                {hasSubmenu && <ChevronRight className="w-3 h-3 ml-2 opacity-50" />}

                {hasSubmenu && isHovered && (
                    <div className="absolute left-full top-0 ml-0.5 w-40 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 z-50 select-none text-xs font-medium text-white/80" ref={menuRef}>
            <div className="flex items-center gap-1">
                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                        onClick={() => toggleMenu('apple')}
                    >
                        <span className="font-bold"></span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'apple' && (
                            <MenuDropdown>
                                <MenuItem label="About This OS" onClick={() => alert("Portfolio OS v2.0\nBuilt with Next.js & Tailwind")} />
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="System Preferences..." />
                                <MenuItem label="App Store..." />
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Recent Items" hasSubmenu>
                                    <MenuItem label="Project 1" />
                                    <MenuItem label="Project 2" />
                                </MenuItem>
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Force Quit..." shortcut="⌥⌘Esc" />
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Sleep" />
                                <MenuItem label="Restart..." onClick={() => window.location.reload()} />
                                <MenuItem label="Shut Down..." />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'file' ? 'bg-white/10' : ''}`}
                        onClick={() => toggleMenu('file')}
                    >
                        <span>File</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'file' && (
                            <MenuDropdown>
                                <MenuItem label="New Window" shortcut="⌘N" />
                                <MenuItem label="New Folder" shortcut="⇧⌘N" />
                                <MenuItem label="Open..." shortcut="⌘O" />
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Close Window" shortcut="⌘W" />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'edit' ? 'bg-white/10' : ''}`}
                        onClick={() => toggleMenu('edit')}
                    >
                        <span>Edit</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'edit' && (
                            <MenuDropdown>
                                <MenuItem label="Undo" shortcut="⌘Z" />
                                <MenuItem label="Redo" shortcut="⇧⌘Z" />
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Cut" shortcut="⌘X" />
                                <MenuItem label="Copy" shortcut="⌘C" />
                                <MenuItem label="Paste" shortcut="⌘V" />
                                <MenuItem label="Select All" shortcut="⌘A" />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'view' ? 'bg-white/10' : ''}`}
                        onClick={() => toggleMenu('view')}
                    >
                        <span>View</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'view' && (
                            <MenuDropdown>
                                <MenuItem label="Theme" hasSubmenu>
                                    <MenuItem label="Light" onClick={() => setTheme('light')} />
                                    <MenuItem label="Dark" onClick={() => setTheme('dark')} />
                                    <MenuItem label="System" onClick={() => setTheme('system')} />
                                </MenuItem>
                                <MenuItem label="Language" hasSubmenu>
                                    <MenuItem label="English" onClick={() => setLanguage('en')} />
                                    <MenuItem label="Français" onClick={() => setLanguage('fr')} />
                                    <MenuItem label="Chinese" onClick={() => setLanguage('cn')} />
                                </MenuItem>
                                <div className="h-px bg-white/10 my-1" />
                                <MenuItem label="Enter Full Screen" shortcut="Fn F" />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-2">
                    <Wifi className="w-3.5 h-3.5" />
                    <Volume2 className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                </div>
                <div className="relative calendar-trigger">
                    <span
                        className="px-2 hover:bg-white/10 rounded cursor-pointer py-1 transition-colors"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        {date} &nbsp; {time}
                    </span>
                    <AnimatePresence>
                        {showCalendar && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-2 w-64 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-4 z-50"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-lg">{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                                    <div className="flex gap-2">
                                        <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer">
                                            <ChevronRight className="w-4 h-4 rotate-180" />
                                        </div>
                                        <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 opacity-50">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {Array.from({ length: 30 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={`aspect-square flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer ${i + 1 === new Date().getDate() ? 'bg-blue-500 text-white' : ''}`}
                                        >
                                            {i + 1}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
