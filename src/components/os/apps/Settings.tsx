"use client";

import React, { useState } from 'react';
import { useSettings, bgPresets } from '@/context/SettingsContext';
import { Monitor, Globe, Info, Moon, Sun, Laptop, Check } from 'lucide-react';

type Tab = 'appearance' | 'language' | 'about';

export default function Settings() {
    const { theme, setTheme, language, setLanguage, bgPreset, setBgPreset, t } = useSettings();
    const [activeTab, setActiveTab] = useState<Tab>('appearance');

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-200 font-sans transition-colors duration-200">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-[#252526] border-r border-gray-200 dark:border-white/10 p-4 flex flex-col gap-2 transition-colors duration-200">
                <button
                    onClick={() => setActiveTab('appearance')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'bg-blue-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                    <Monitor className="w-4 h-4" />
                    {t('settings.appearance')}
                </button>
                <button
                    onClick={() => setActiveTab('language')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'language' ? 'bg-blue-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                    <Globe className="w-4 h-4" />
                    {t('settings.language')}
                </button>
                <button
                    onClick={() => setActiveTab('about')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'about' ? 'bg-blue-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
                >
                    <Info className="w-4 h-4" />
                    {t('system.about')}
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'appearance' && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">{t('settings.appearance')}</h2>

                        <div className="space-y-8">
                            {/* Theme Section */}
                            <section>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">{t('settings.theme')}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <button
                                        onClick={() => setTheme('light')}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
                                    >
                                        <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                            <Sun className="w-8 h-8 text-gray-800" />
                                        </div>
                                        <span className="text-sm font-medium">{t('settings.light')}</span>
                                    </button>

                                    <button
                                        onClick={() => setTheme('dark')}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
                                    >
                                        <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                                            <Moon className="w-8 h-8 text-white" />
                                        </div>
                                        <span className="text-sm font-medium">{t('settings.dark')}</span>
                                    </button>

                                    <button
                                        onClick={() => setTheme('system')}
                                        className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
                                    >
                                        <div className="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-900 rounded-lg flex items-center justify-center">
                                            <Laptop className="w-8 h-8 text-gray-500" />
                                        </div>
                                        <span className="text-sm font-medium">{t('settings.system')}</span>
                                    </button>
                                </div>
                            </section>

                            {/* Background Section */}
                            <section>
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Background</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {bgPresets.map(preset => (
                                        <button
                                            key={preset.id}
                                            onClick={() => setBgPreset(preset)}
                                            className={`relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${bgPreset.id === preset.id ? 'border-blue-500 bg-blue-500/10' : 'border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'}`}
                                        >
                                            <div
                                                className="w-full aspect-video rounded-lg shadow-sm overflow-hidden"
                                                style={{ background: preset.type !== 'animated' ? preset.value : 'linear-gradient(45deg, #000, #333)' }}
                                            >
                                                {preset.type === 'animated' && (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-white/50 bg-black">
                                                        Animated
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium">{preset.name}</span>
                                            {bgPreset.id === preset.id && (
                                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {activeTab === 'language' && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">{t('settings.language')}</h2>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name="language"
                                    checked={language === 'en'}
                                    onChange={() => setLanguage('en')}
                                    className="w-4 h-4 text-blue-500"
                                />
                                <span>English</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
                                <input
                                    type="radio"
                                    name="language"
                                    checked={language === 'fr'}
                                    onChange={() => setLanguage('fr')}
                                    className="w-4 h-4 text-blue-500"
                                />
                                <span>Français</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors">
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
                    </>
                )}

                {activeTab === 'about' && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">{t('system.about')}</h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300">
                            <p>PortfoliOS v2.0.0</p>
                            <p>Created by Yohann CHAVANEL</p>
                            <p>Built with Next.js, Tailwind CSS, and Framer Motion.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
