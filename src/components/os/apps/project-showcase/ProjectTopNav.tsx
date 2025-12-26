import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';

export function ProjectTopNav({
    projects,
    selectedIndex,
    onSelect,
}: {
    projects: ProjectData[];
    selectedIndex: number;
    onSelect: (index: number) => void;
}) {
    const { t } = useSettings();

    return (
        <div className="relative z-10 p-3">
            <GlassPanel className="px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                    <Sparkles className="w-4 h-4" />
                    {t('showcase.title')}
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {projects.map((proj, idx) => {
                        const active = idx === selectedIndex;
                        const accent = proj.colors.accent ?? proj.colors.secondary;
                        const itemGradient = `linear-gradient(135deg, ${proj.colors.primary}, ${proj.colors.secondary}, ${accent})`;

                        return (
                            <button
                                key={proj.id}
                                onClick={() => onSelect(idx)}
                                className={cn(
                                    'shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all',
                                    active
                                        ? 'border-white/20 bg-white/15'
                                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                                )}
                            >
                                <span
                                    className="text-transparent bg-clip-text"
                                    style={{ backgroundImage: itemGradient }}
                                >
                                    {proj.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </GlassPanel>
        </div>
    );
}
