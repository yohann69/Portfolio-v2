import React from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';

export function ProjectSidebar({
    projects,
    selectedIndex,
    onSelect,
    accentColor,
}: {
    projects: ProjectData[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    accentColor: string;
}) {
    const { t } = useSettings();
    return (
        <div className="relative z-10 w-72 p-4">
            <GlassPanel className="h-full overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="p-4 border-b border-white/10">
                    <h2 className="text-base font-semibold flex items-center gap-2">
                        <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
                        {t('showcase.title')}
                    </h2>
                    <p className="text-xs text-white/60 mt-1">{t('showcase.subtitle')}</p>
                </div>

                <div className="p-3 flex flex-col gap-2">
                    {projects.map((proj, idx) => {
                        const accent = proj.colors.accent ?? proj.colors.secondary;
                        const itemGradient = `linear-gradient(135deg, ${proj.colors.primary}, ${proj.colors.secondary}, ${accent})`;
                        const active = selectedIndex === idx;
                        return (
                            <button
                                key={proj.id}
                                onClick={() => onSelect(idx)}
                                className={cn(
                                    'relative group text-left rounded-2xl p-3 transition-all duration-300',
                                    'hover:scale-[1.02] active:scale-[0.99]',
                                    active
                                        ? 'bg-white/10 border border-white/15'
                                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                )}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: itemGradient,
                                        filter: 'blur(22px)',
                                        opacity: active ? 0.22 : undefined,
                                    }}
                                />

                                <div className="relative flex items-center gap-3">
                                    <div
                                        className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold border border-white/15 shadow-lg"
                                        style={{
                                            background: itemGradient,
                                        }}
                                    >
                                        {proj.logoSrc ? (
                                            <Image
                                                src={proj.logoSrc}
                                                alt={`${proj.name} logo`}
                                                width={28}
                                                height={28}
                                                className="object-contain"
                                            />
                                        ) : (
                                            proj.name.substring(0, 2).toUpperCase()
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-sm truncate">{proj.name}</div>
                                        <div className="text-xs text-white/60 truncate">{t(proj.taglineKey)}</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </GlassPanel>
        </div>
    );
}
