import React, { useMemo } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';

export function ProjectHero({ project }: { project: ProjectData }) {
    const gradientText = useMemo(() => {
        const accent = project.colors.accent ?? project.colors.secondary;
        return `linear-gradient(90deg, ${project.colors.primary}, ${project.colors.secondary}, ${accent})`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    return (
        <div className="px-8 pt-8">
            <GlassPanel className="relative overflow-hidden">
                <div
                    className="absolute -inset-12 opacity-35"
                    style={{
                        background: `radial-gradient(800px 420px at 20% 30%, ${project.colors.primary}55 0%, transparent 60%),
                        radial-gradient(700px 420px at 80% 40%, ${project.colors.secondary}55 0%, transparent 60%),
                        radial-gradient(700px 520px at 55% 85%, ${(project.colors.accent ?? project.colors.secondary)}45 0%, transparent 62%)`,
                        filter: 'blur(28px)',
                        transform: 'translate(calc(var(--mx) * 18px), calc(var(--my) * 18px))',
                    }}
                />

                <div className="relative p-10">
                    <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                                <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: project.colors.primary }} />
                                {project.year}
                            </div>

                            <h1
                                className="mt-5 text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text"
                                style={{ backgroundImage: gradientText }}
                            >
                                {project.name}
                            </h1>

                            <p className="mt-3 text-xl md:text-2xl text-white/80 font-medium">
                                {project.tagline}
                            </p>
                            <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                {project.link ? (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 px-5 py-2.5 text-sm font-semibold transition-all"
                                    >
                                        Open project
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-5 py-2.5 text-sm text-white/60">
                                        Private link
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div
                                className="relative h-28 w-28 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-2xl shadow-2xl"
                                style={{
                                    transform: 'translate(calc(var(--mx) * -6px), calc(var(--my) * -6px))',
                                }}
                            >
                                <div
                                    className="absolute inset-0 rounded-3xl opacity-60"
                                    style={{
                                        background: gradientText,
                                        filter: 'blur(18px)',
                                    }}
                                />
                                <div className="relative h-full w-full flex items-center justify-center text-3xl font-black">
                                    {project.name.substring(0, 2).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-center opacity-70">
                        <ChevronRight className="w-6 h-6 rotate-90" />
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
