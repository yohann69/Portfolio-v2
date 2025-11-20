"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'fr' | 'cn';

interface SettingsContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    return (
        <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage }}>
            {children}
        </SettingsContext.Provider>
    );
};
