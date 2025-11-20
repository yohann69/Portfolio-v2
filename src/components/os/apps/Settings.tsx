"use client";

import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { Monitor, Globe, Info, Moon, Sun, Laptop } from 'lucide-react';

export default function Settings() {
    const { theme, setTheme, language, setLanguage, t } = useSettings();

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-200 font-sans">
            {/* Sidebar */}
            <div className="w-48 bg-[#252526] border-r border-white/10 p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                    <Monitor className="w-4 h-4" />
                    {t('settings.appearance')}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm font-medium">
                    <Globe className="w-4 h-4" />
                    {t('settings.language')}
                </div>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 text-gray-400 rounded-lg text-sm font-medium">
                    <Info className="w-4 h-4" />
                    {t('system.about')}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{t('settings.appearance')}</h2>

                <div className="space-y-8">
                    {/* Theme Section */}
                    <section>
                        <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{t('settings.theme')}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:bg-white/5'}`}
                            >
                                <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                    <Sun className="w-8 h-8 text-gray-800" />
                                </div>
                                <span className="text-sm font-medium">{t('settings.light')}</span>
                            </button>

                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:bg-white/5'}`}
                            >
                                <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                                    <Moon className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-sm font-medium">{t('settings.dark')}</span>
                            </button>

                            <button
                                onClick={() => setTheme('system')}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:bg-white/5'}`}
                            >
                                <div className="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-900 rounded-lg flex items-center justify-center">
                                    <Laptop className="w-8 h-8 text-gray-500" />
                                </div>
                                <span className="text-sm font-medium">{t('settings.system')}</span>
                            </button>
                        </div>
                    </section>

                    {/* Language Section */}
                    <section>
                        <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">{t('settings.language')}</h3>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name="language"
                                    checked={language === 'en'}
                                    onChange={() => setLanguage('en')}
                                    className="w-4 h-4 text-blue-500"
                                />
                                <span>English</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name="language"
                                    checked={language === 'fr'}
                                    onChange={() => setLanguage('fr')}
                                    className="w-4 h-4 text-blue-500"
                                />
                                <span>Français</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name="language"
                                    checked={language === 'cn'}
                                    onChange={() => setLanguage('cn')}
                                    className="w-4 h-4 text-blue-500"
                                />
                                <span>中文</span>
                            </label>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
