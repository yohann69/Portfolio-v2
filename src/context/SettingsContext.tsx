"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationKey } from '@/utils/translations';

type Theme = 'light' | 'dark' | 'system';
type Language = 'en' | 'fr' | 'cn';

interface SettingsContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
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
        <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, t }}>
            {children}
        </SettingsContext.Provider>
    );
};
