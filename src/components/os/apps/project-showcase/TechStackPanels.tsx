import React from 'react';
import { Code2, Database, Terminal } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';

function TechPill({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/80">
            {icon}
            {label}
        </span>
    );
}

function getTechIcon(tech: string) {
    const lower = tech.toLowerCase();
    if (
        lower.includes('react') ||
        lower.includes('solid') ||
        lower.includes('javascript') ||
        lower.includes('html') ||
        lower.includes('css') ||
        lower.includes('tailwind') ||
        lower.includes('typescript') ||
        lower.includes('expo')
    ) {
        return <Code2 className="w-4 h-4" />;
    }
    if (lower.includes('golang') || lower.includes('node') || lower.includes('parser')) {
        return <Terminal className="w-4 h-4" />;
    }
    return <Database className="w-4 h-4" />;
}

export function TechStackPanels({ project }: { project: ProjectData }) {
    return (
        <div className="px-8 py-10">
            <div className="grid lg:grid-cols-2 gap-6">
                <GlassPanel className="p-7 overflow-hidden relative shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                    <div
                        className="absolute -inset-10 opacity-35"
                        style={{
                            background: `radial-gradient(500px 340px at 20% 30%, ${project.colors.primary}45 0%, transparent 60%)`,
                            filter: 'blur(26px)',
                            transform: 'translate(calc(var(--mx) * 10px), calc(var(--my) * 10px))',
                        }}
                    />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Frontend</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.techStack.frontend.map((tech) => (
                                <TechPill key={tech} icon={getTechIcon(tech)} label={tech} />
                            ))}
                        </div>
                    </div>
                </GlassPanel>

                <GlassPanel className="p-7 overflow-hidden relative shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
                    <div
                        className="absolute -inset-10 opacity-35"
                        style={{
                            background: `radial-gradient(520px 360px at 80% 30%, ${project.colors.secondary}45 0%, transparent 60%)`,
                            filter: 'blur(26px)',
                            transform: 'translate(calc(var(--mx) * -10px), calc(var(--my) * 10px))',
                        }}
                    />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                                <Database className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Backend</h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.techStack.backend.length > 0 ? (
                                project.techStack.backend.map((tech) => (
                                    <TechPill key={tech} icon={getTechIcon(tech)} label={tech} />
                                ))
                            ) : (
                                <span className="text-sm text-white/60">No backend for this project.</span>
                            )}
                        </div>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
}
