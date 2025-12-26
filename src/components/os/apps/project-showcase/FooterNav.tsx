import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';

export function FooterNav({
    projects,
    selectedIndex,
    onSelect,
    project,
}: {
    projects: ProjectData[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    project: ProjectData;
}) {
    const { t } = useSettings();
    return (
        <div className="px-8 pb-8">
            <GlassPanel className="rounded-[22px] px-6 py-4 flex items-center justify-between shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="text-xs text-white/60">{t('showcase.projectLabel')} {selectedIndex + 1} / {projects.length}</div>

                <div className="flex gap-2">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelect(idx)}
                            className={cn(
                                'h-2 rounded-full transition-all duration-300',
                                selectedIndex === idx ? 'w-8' : 'w-2 hover:w-4'
                            )}
                            style={{
                                backgroundColor: selectedIndex === idx ? project.colors.primary : 'rgba(255,255,255,0.25)',
                            }}
                        />
                    ))}
                </div>

                {project.link ? (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-2"
                    >
                        {t('showcase.open')}
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                ) : (
                    <div className="text-xs text-white/40">{t('showcase.notPublished')}</div>
                )}
            </GlassPanel>
        </div>
    );
}
