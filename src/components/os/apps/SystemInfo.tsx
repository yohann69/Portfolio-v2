"use client";

import React from 'react';
import Image from 'next/image';
import { useSettings } from '@/context/SettingsContext';

export default function SystemInfo() {
    const { t } = useSettings();

    return (
        <div className="p-8 text-white font-mono h-full bg-black/90">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Section */}
                <div className="w-full md:w-1/3 flex flex-col items-center text-center border-r border-white/10 pr-8">
                    <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-2 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                        <img src="/mevertical.jpg" alt="Yohann CHAVANEL" className="object-cover w-full h-full" />
                    </div>
                    <h1 className="text-2xl font-bold text-green-400 mb-2">Yohann CHAVANEL</h1>
                    <p className="text-sm text-gray-400 mb-4">{t('sysinfo.job.title')}</p>
                    <div className="w-full h-px bg-white/10 my-4" />
                    <div className="text-xs text-left w-full space-y-2 text-gray-300">
                        <p><span className="text-green-500">{t('sysinfo.role')}:</span> Alternant Développeur</p>
                        <p><span className="text-green-500">{t('sysinfo.company')}:</span> La Poste</p>
                        <p><span className="text-green-500">{t('sysinfo.school')}:</span> IMT Atlantique</p>
                        <p><span className="text-green-500">{t('sysinfo.location')}:</span> Valence, Lyon, Nantes</p>
                    </div>
                </div>

                {/* Specs / Skills Section */}
                <div className="w-full md:w-2/3">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                            {t('sysinfo.bio.title')}
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            {t('sysinfo.bio.text')}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                            {t('sysinfo.skills.title')}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Languages */}
                            {['JavaScript', 'NodeJS', 'HTML5', 'CSS3', 'Python', 'PHP', 'Java', 'C', 'MySQL', 'PostgreSQL', 'MongoDB', 'Go', 'Rust'].map(skill => (
                                <div key={skill} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                            {t('sysinfo.tools.title')}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {['VS Code', 'Jetbrains', 'Git', 'Docker', 'Linux', 'Figma'].map(tool => (
                                <div key={tool} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
