"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/utils/translations';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'fr' | 'cn';

export type BgPreset = {
    id: string;
    name: string;
    type: 'gradient' | 'solid' | 'animated';
    value: string;
};

export const bgPresets: BgPreset[] = [
    { id: 'default', name: 'Default (Animated)', type: 'animated', value: '' },
    { id: 'blue', name: 'Ocean Blue', type: 'gradient', value: 'linear-gradient(to bottom right, #2563eb, #06b6d4)' },
    { id: 'purple', name: 'Deep Purple', type: 'gradient', value: 'linear-gradient(to bottom right, #7c3aed, #c026d3)' },
    { id: 'dark', name: 'Midnight', type: 'solid', value: '#0f172a' },
    { id: 'sunset', name: 'Sunset', type: 'gradient', value: 'linear-gradient(to bottom right, #f97316, #db2777)' },
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
