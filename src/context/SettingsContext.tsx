"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/utils/translations';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'fr' | 'cn';

export type BgPreset = {
    id: string;
    name: string;
    type: 'animated';
    colors: {
        blob1: string;
        blob2: string;
        blob3: string;
        blob4: string;
        blob5: string;
    };
};

export const bgPresets: BgPreset[] = [
    {
        id: 'default',
        name: 'Default',
        type: 'animated',
        colors: {
            blob1: 'bg-blue-600/30',
            blob2: 'bg-purple-600/30',
            blob3: 'bg-orange-600/30',
            blob4: 'bg-yellow-600/20',
            blob5: 'bg-red-600/20'
        }
    },
    {
        id: 'ocean',
        name: 'Ocean',
        type: 'animated',
        colors: {
            blob1: 'bg-cyan-600/30',
            blob2: 'bg-blue-600/30',
            blob3: 'bg-teal-600/30',
            blob4: 'bg-sky-600/20',
            blob5: 'bg-indigo-600/20'
        }
    },
    {
        id: 'sunset',
        name: 'Sunset',
        type: 'animated',
        colors: {
            blob1: 'bg-orange-600/30',
            blob2: 'bg-red-600/30',
            blob3: 'bg-pink-600/30',
            blob4: 'bg-yellow-600/20',
            blob5: 'bg-rose-600/20'
        }
    },
    {
        id: 'forest',
        name: 'Forest',
        type: 'animated',
        colors: {
            blob1: 'bg-green-600/30',
            blob2: 'bg-emerald-600/30',
            blob3: 'bg-lime-600/30',
            blob4: 'bg-teal-600/20',
            blob5: 'bg-cyan-600/20'
        }
    },
    {
        id: 'lavender',
        name: 'Lavender',
        type: 'animated',
        colors: {
            blob1: 'bg-purple-600/30',
            blob2: 'bg-violet-600/30',
            blob3: 'bg-fuchsia-600/30',
            blob4: 'bg-indigo-600/20',
            blob5: 'bg-pink-600/20'
        }
    }
];

interface SettingsContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
    bgPreset: BgPreset;
    setBgPreset: (preset: BgPreset) => void;
    t: (key: TranslationKey) => string;
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
    const [theme, setTheme] = useState<Theme>('system');
    const [language, setLanguage] = useState<Language>('en');
    const [bgPreset, setBgPreset] = useState<BgPreset>(bgPresets[0]);

    useEffect(() => {
        // Set initial language based on browser
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'fr') setLanguage('fr');
        else if (browserLang === 'zh') setLanguage('cn');
        else setLanguage('en');
    }, []);

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

    const t = (key: TranslationKey): string => {
        return translations[language][key] || key;
    };

    return (
        <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, bgPreset, setBgPreset, t }}>
            {children}
        </SettingsContext.Provider>
    );
};
