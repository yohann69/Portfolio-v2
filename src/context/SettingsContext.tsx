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
            blob1: 'bg-[#2563eb]/30', // Blue 600
            blob2: 'bg-[#9333ea]/30', // Purple 600
            blob3: 'bg-[#ea580c]/30', // Orange 600
            blob4: 'bg-[#ca8a04]/20', // Yellow 600
            blob5: 'bg-[#dc2626]/20'  // Red 600
        }
    },
    {
        id: 'ocean-depths',
        name: 'Ocean Depths',
        type: 'animated',
        colors: {
            blob1: 'bg-[#1d4ed8]/30', // Blue 700
            blob2: 'bg-[#14b8a6]/30', // Teal 500
            blob3: 'bg-[#4f46e5]/30', // Indigo 600
            blob4: 'bg-[#a855f7]/20', // Purple 500
            blob5: 'bg-[#4ade80]/20'  // Green 400
        }
    },
    {
        id: 'sunset-glow',
        name: 'Sunset Glow',
        type: 'animated',
        colors: {
            blob1: 'bg-[#dc2626]/30', // Red 600
            blob2: 'bg-[#f97316]/30', // Orange 500
            blob3: 'bg-[#eab308]/30', // Yellow 500
            blob4: 'bg-[#9333ea]/20', // Purple 600
            blob5: 'bg-[#ec4899]/20'  // Pink 500
        }
    },
    {
        id: 'mystic-forest',
        name: 'Mystic Forest',
        type: 'animated',
        colors: {
            blob1: 'bg-[#16a34a]/30', // Green 600
            blob2: 'bg-[#0d9488]/30', // Teal 600
            blob3: 'bg-[#facc15]/30', // Yellow 400
            blob4: 'bg-[#a855f7]/20', // Purple 500
            blob5: 'bg-[#60a5fa]/20'  // Blue 400
        }
    },
    {
        id: 'royal-velvet',
        name: 'Royal Velvet',
        type: 'animated',
        colors: {
            blob1: 'bg-[#7e22ce]/30', // Purple 700
            blob2: 'bg-[#db2777]/30', // Pink 600
            blob3: 'bg-[#4f46e5]/30', // Indigo 600
            blob4: 'bg-[#ef4444]/20', // Red 500
            blob5: 'bg-[#3b82f6]/20'  // Blue 500
        }
    },
    {
        id: 'cherry-blossom',
        name: 'Cherry Blossom',
        type: 'animated',
        colors: {
            blob1: 'bg-[#ec4899]/30', // Pink 500
            blob2: 'bg-[#f87171]/30', // Red 400
            blob3: 'bg-[#22c55e]/30', // Green 500
            blob4: 'bg-[#c084fc]/20', // Purple 400
            blob5: 'bg-[#fef08a]/20'  // Yellow 200
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
