import React from 'react';
import { Star } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';

export function ProjectQuote({ project }: { project: ProjectData }) {
    return (
        <div className="px-8 pb-10">
            <GlassPanel className="p-10 overflow-hidden relative">
                <div
                    className="absolute -inset-10 opacity-30"
                    style={{
                        background: `radial-gradient(620px 420px at 50% 20%, ${project.colors.primary}40 0%, transparent 60%),
                        radial-gradient(620px 420px at 50% 80%, ${project.colors.secondary}35 0%, transparent 60%)`,
                        filter: 'blur(28px)',
                        transform: 'translate(calc(var(--mx) * 10px), calc(var(--my) * -8px))',
                    }}
                />
                <div className="relative text-center">
                    <Star className="w-10 h-10 mx-auto mb-5" style={{ color: project.colors.secondary }} />
                    <blockquote className="text-xl md:text-2xl font-semibold leading-relaxed text-white/85">
                        “{project.quote}”
                    </blockquote>
                </div>
            </GlassPanel>
        </div>
    );
}
