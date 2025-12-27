"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Volume2, Search, Apple, Calendar as CalendarIcon, ChevronRight, Check } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useWindowManager } from './WindowManager';
import { motion, AnimatePresence } from 'framer-motion';

export const TopBar = () => {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const { theme, setTheme, language, setLanguage, t } = useSettings();
    const { openWindow, windows } = useWindowManager();
    const menuRef = useRef<HTMLDivElement>(null);

    const isAnyWindowMaximized = Object.values(windows).some((w) => w.isOpen && w.isMaximized);

    const [displayDate, setDisplayDate] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString(language === 'fr' ? 'fr-FR' : language === 'cn' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' }));
            setDate(now.toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'cn' ? 'zh-CN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [language]);

    useEffect(() => {
        if (showCalendar) {
            setDisplayDate(new Date());
        }
    }, [showCalendar]);

    const handlePrevMonth = () => {
        setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
    };

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(displayDate);
        const firstDay = getFirstDayOfMonth(displayDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }

        // Days of current month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === displayDate.getMonth() && today.getFullYear() === displayDate.getFullYear();

        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = isCurrentMonth && i === today.getDate();
            days.push(
                <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm cursor-pointer transition-colors
                        ${isToday ? 'bg-blue-500 text-white font-bold' : 'hover:bg-black/5 dark:hover:bg-white/10'}
                    `}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

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
            className={`absolute top-full left-0 mt-1 w-48 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-2xl py-1 z-50 ${className}`}
        >
            {children}
        </motion.div>
    );

    const MenuItem = ({ label, shortcut, onClick, hasSubmenu, children }: { label: string, shortcut?: string, onClick?: () => void, hasSubmenu?: boolean, children?: React.ReactNode }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className="relative px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-default flex items-center justify-between group text-xs text-black dark:text-white"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
            >
                <span>{label}</span>
                {shortcut && <span className="text-black/40 dark:text-white/40 group-hover:text-white/80 ml-4">{shortcut}</span>}
                {hasSubmenu && <ChevronRight className="w-3 h-3 ml-2 opacity-50" />}

                {hasSubmenu && isHovered && (
                    <div className="absolute left-full top-0 ml-0.5 w-40 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-lg shadow-2xl py-1">
                        {children}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={
                `fixed top-0 left-0 right-0 h-8 bg-white/50 dark:bg-black/20 backdrop-blur-md border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 select-none text-xs font-medium text-black/80 dark:text-white/80 transition-colors transition-opacity duration-200 ` +
                (isAnyWindowMaximized ? 'z-0 opacity-0 pointer-events-none' : 'z-50 opacity-100')
            }
            ref={menuRef}
        >
            <div className="flex items-center gap-1">
                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'apple' ? 'bg-black/5 dark:bg-white/10' : ''}`}
                        onClick={() => toggleMenu('apple')}
                    >
                        <span className="font-bold">PortfoliOS</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'apple' && (
                            <MenuDropdown>
                                <MenuItem label={t('system.about')} onClick={() => openWindow('about')} />
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.preferences')} onClick={() => openWindow('settings')} />
                                <MenuItem label={t('system.appstore')} />
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.recent')} hasSubmenu>
                                    <MenuItem label="Project 1" />
                                    <MenuItem label="Project 2" />
                                </MenuItem>
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.forcequit')} shortcut="⌥⌘Esc" />
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.sleep')} />
                                <MenuItem label={t('system.restart')} onClick={() => window.location.reload()} />
                                <MenuItem label={t('system.shutdown')} />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'file' ? 'bg-black/5 dark:bg-white/10' : ''}`}
                        onClick={() => toggleMenu('file')}
                    >
                        <span>{t('system.file')}</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'file' && (
                            <MenuDropdown>
                                <MenuItem label={t('system.newwindow')} shortcut="⌘N" />
                                <MenuItem label={t('system.newfolder')} shortcut="⇧⌘N" />
                                <MenuItem label={t('system.open')} shortcut="⌘O" />
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.close')} shortcut="⌘W" />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'edit' ? 'bg-black/5 dark:bg-white/10' : ''}`}
                        onClick={() => toggleMenu('edit')}
                    >
                        <span>{t('system.edit')}</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'edit' && (
                            <MenuDropdown>
                                <MenuItem label={t('system.undo')} shortcut="⌘Z" />
                                <MenuItem label={t('system.redo')} shortcut="⇧⌘Z" />
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.cut')} shortcut="⌘X" />
                                <MenuItem label={t('system.copy')} shortcut="⌘C" />
                                <MenuItem label={t('system.paste')} shortcut="⌘V" />
                                <MenuItem label={t('system.selectall')} shortcut="⌘A" />
                            </MenuDropdown>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <div
                        className={`px-3 py-1 rounded hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors ${activeMenu === 'view' ? 'bg-black/5 dark:bg-white/10' : ''}`}
                        onClick={() => toggleMenu('view')}
                    >
                        <span>{t('system.view')}</span>
                    </div>
                    <AnimatePresence>
                        {activeMenu === 'view' && (
                            <MenuDropdown>
                                <MenuItem label={t('settings.theme')} hasSubmenu>
                                    <MenuItem label={t('settings.light')} onClick={() => setTheme('light')} />
                                    <MenuItem label={t('settings.dark')} onClick={() => setTheme('dark')} />
                                    <MenuItem label={t('settings.system')} onClick={() => setTheme('system')} />
                                </MenuItem>
                                <MenuItem label={t('settings.language')} hasSubmenu>
                                    <MenuItem label="English" onClick={() => setLanguage('en')} />
                                    <MenuItem label="Français" onClick={() => setLanguage('fr')} />
                                    <MenuItem label="Chinese" onClick={() => setLanguage('cn')} />
                                </MenuItem>
                                <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
                                <MenuItem label={t('system.fullscreen')} shortcut="Fn F" />
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
                        className="px-2 hover:bg-black/5 dark:hover:bg-white/10 rounded cursor-pointer py-1 transition-colors"
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
                                className="absolute top-full right-0 mt-2 w-64 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-xl shadow-2xl p-4 z-50 text-black dark:text-white"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-lg capitalize">
                                        {displayDate.toLocaleString(language === 'fr' ? 'fr-FR' : language === 'cn' ? 'zh-CN' : 'en-US', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <div className="flex gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer"
                                            onClick={handlePrevMonth}
                                        >
                                            <ChevronRight className="w-4 h-4 rotate-180" />
                                        </div>
                                        <div
                                            className="w-6 h-6 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center cursor-pointer"
                                            onClick={handleNextMonth}
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 opacity-50 font-medium">
                                    {t('calendar.weekdays').split(',').map((day, i) => (
                                        <span key={i}>{day}</span>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                    {renderCalendarDays()}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
