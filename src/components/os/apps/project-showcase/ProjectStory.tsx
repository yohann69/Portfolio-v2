import React from 'react';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';

export function ProjectStory({ project }: { project: ProjectData }) {
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
                    <h2 className="text-2xl md:text-3xl font-extrabold">{project.story.title}</h2>
                    <div className="mt-4 space-y-4 text-white/75 leading-relaxed">
                        {project.story.body.map((p) => (
                            <p key={p} className="text-base md:text-lg">
                                {p}
                            </p>
                        ))}
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
