"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AppId = 'system-info' | 'projects' | 'experience' | 'gallery' | 'messenger' | 'settings' | 'snake' | 'about';

interface WindowState {
    id: AppId;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
    title: string;
    icon?: React.ReactNode;
}

interface WindowContextType {
    windows: Record<AppId, WindowState>;
    activeWindowId: AppId | null;
    openWindow: (id: AppId) => void;
    closeWindow: (id: AppId) => void;
    minimizeWindow: (id: AppId) => void;
    maximizeWindow: (id: AppId) => void;
    focusWindow: (id: AppId) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowManager = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindowManager must be used within a WindowManagerProvider');
    }
    return context;
};

const initialWindows: Record<AppId, WindowState> = {
    'system-info': { id: 'system-info', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 1, title: 'System Info' },
    'projects': { id: 'projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Project Explorer' },
    'experience': { id: 'experience', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Timeline Log' },
    'gallery': { id: 'gallery', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Media Gallery' },
    'messenger': { id: 'messenger', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Encrypted Messenger' },
    'settings': { id: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Settings' },
    'snake': { id: 'snake', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'Snake Game' },
    'about': { id: 'about', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0, title: 'About PortfoliOS' },
};

export const WindowManagerProvider = ({ children }: { children: ReactNode }) => {
    const [windows, setWindows] = useState<Record<AppId, WindowState>>(initialWindows);
    const [activeWindowId, setActiveWindowId] = useState<AppId | null>('system-info');
    const [maxZIndex, setMaxZIndex] = useState(10);

    const focusWindow = (id: AppId) => {
        if (windows[id].isOpen) {
            const newZIndex = maxZIndex + 1;
            setMaxZIndex(newZIndex);
            setActiveWindowId(id);
            setWindows((prev) => ({
                ...prev,
                [id]: { ...prev[id], zIndex: newZIndex, isMinimized: false },
            }));
        }
    };

    const openWindow = (id: AppId) => {
        if (windows[id].isOpen) {
            focusWindow(id);
            return;
        }
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        setActiveWindowId(id);
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newZIndex },
        }));
    };

    const closeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, isMaximized: false },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const minimizeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    };

    const maximizeWindow = (id: AppId) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
        }));
        focusWindow(id);
    };

    // Global keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Close active window with Cmd+W or Ctrl+W
            if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
                e.preventDefault();
                if (activeWindowId) {
                    closeWindow(activeWindowId);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeWindowId]);

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                openWindow,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
                focusWindow,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};
