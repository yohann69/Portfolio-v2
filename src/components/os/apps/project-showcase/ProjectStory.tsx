import React from 'react';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';

export function ProjectStory({ project }: { project: ProjectData }) {
    const { t } = useSettings();
    return (
        <div className="px-8 pb-10">
            <GlassPanel className="p-10 overflow-hidden relative">
                <div
                    className="absolute -inset-10 opacity-30"
                    style={{
                        background: `radial-gradient(620px 420px at 30% 20%, ${project.colors.primary}40 0%, transparent 60%),
                        radial-gradient(620px 420px at 70% 80%, ${project.colors.secondary}35 0%, transparent 60%)`,
                        filter: 'blur(28px)',
                        transform: 'translate(calc(var(--mx) * 10px), calc(var(--my) * -8px))',
                    }}
                />

                <div className="relative">
                    <h2 className="text-2xl md:text-3xl font-extrabold">{t(project.story.titleKey)}</h2>
                    <div className="mt-4 space-y-4 text-white/75 leading-relaxed">
                        {project.story.bodyKeys.map((key) => (
                            <p key={key} className="text-base md:text-lg">
                                {t(key)}
                            </p>
                        ))}
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
