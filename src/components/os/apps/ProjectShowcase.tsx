"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Code2, Database, ChevronRight, Play, Star, Sparkles, Terminal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useWindowManager } from '../WindowManager';

interface TechStack {
    frontend: string[];
    backend: string[];
}

interface ProjectData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    screenshots: string[];
    techStack: TechStack;
    link?: string;
    colors: {
        primary: string;
        secondary: string;
        accent?: string;
    };
    comment: string;
    year: string;
}

const projects: ProjectData[] = [
    {
        id: 'transat',
        name: 'Transat',
        tagline: 'React Native • Tailwind • Go',
        description: 'Mobile app built with React Native + Tailwind UI patterns, backed by a fast Golang API and PostgreSQL.',
        screenshots: ['/transat1.png', '/transat2.png', '/transat3.png'],
        techStack: {
            frontend: ['React Native', 'Tailwind CSS'],
            backend: ['Golang', 'PostgreSQL'],
        },
        colors: {
            primary: '#FF6B35',
            secondary: '#4ECDC4',
            accent: '#FFE5B4',
        },
        comment: 'Orange/blue/creme palette with a premium, travel-ready vibe.',
        year: '2024',
    },
    {
        id: 'destimt',
        name: 'Destimt',
        tagline: 'React • Go • MongoDB',
        description: 'Web app focused on speed and clarity, combining React on the front with a Golang backend and MongoDB.',
        screenshots: ['/destimt1.png', '/destimt2.png', '/destimt3.png'],
        techStack: {
            frontend: ['React'],
            backend: ['Golang', 'MongoDB'],
        },
        colors: {
            primary: '#9B59B6',
            secondary: '#8E44AD',
        },
        comment: 'Bold monochrome purple look — clean, focused, confident.',
        year: '2023',
    },
    {
        id: 'adn',
        name: 'Eligibilité ADN',
        tagline: 'SolidJS • Go • PostGIS',
        description: 'Fiber eligibility platform with mapping and geospatial data: SolidJS frontend, Golang backend, PostgreSQL + PostGIS.',
        screenshots: ['/adn1.png', '/adn2.png', '/adn3.png'],
        techStack: {
            frontend: ['SolidJS'],
            backend: ['Golang', 'PostgreSQL', 'PostGIS'],
        },
        link: 'https://ardechedromenumerique.fr/eligibilite',
        colors: {
            primary: '#3498DB',
            secondary: '#F1C40F',
        },
        comment: 'Blue/yellow energy — crisp contrast for data + maps.',
        year: '2023',
    },
    {
        id: 'voyo',
        name: 'Voyo',
        tagline: 'React Native • Node.js • MongoDB',
        description: 'Warm-toned mobile experience built with React Native, backed by Node.js and MongoDB.',
        screenshots: ['/voyo1.png', '/voyo2.png', '/voyo3.png'],
        techStack: {
            frontend: ['React Native'],
            backend: ['Node.js', 'MongoDB'],
        },
        colors: {
            primary: '#E67E22',
            secondary: '#D35400',
            accent: '#F39C12',
        },
        comment: 'Warm gradients, friendly interactions, mobile-first.',
        year: '2023',
    },
    {
        id: 'ade',
        name: 'ADE Calendar',
        tagline: 'JS/HTML/CSS',
        description: 'A lightweight responsive schedule viewer built with classic web tech and clean blue-tones.',
        screenshots: ['/ade1.png', '/ade2.png', '/ade3.png'],
        techStack: {
            frontend: ['JavaScript', 'HTML', 'CSS'],
            backend: [],
        },
        link: 'https://ade.pages.dev',
        colors: {
            primary: '#3498DB',
            secondary: '#2C3E50',
            accent: '#5DADE2',
        },
        comment: 'Blue tones, minimal UI, maximum readability.',
        year: '2023',
    },
];

interface ProjectShowcaseProps {
    projectId?: string;
}

export default function ProjectShowcase({ projectId: propProjectId }: ProjectShowcaseProps) {
    const { windows } = useWindowManager();
    const windowData = windows['project-showcase']?.data;
    const projectId = windowData?.projectId || propProjectId;

    const [selectedProject, setSelectedProject] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const targetPointer = useRef({ x: 0, y: 0 });
    const smoothPointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (projectId) {
            const index = projects.findIndex(p => p.id === projectId);
            if (index !== -1) {
                setSelectedProject(index);
            }
        }
    }, [projectId]);

    useEffect(() => {
        const handleScroll = () => {
            // reserved for future scroll-reactive effects
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            smoothPointer.current.x += (targetPointer.current.x - smoothPointer.current.x) * 0.08;
            smoothPointer.current.y += (targetPointer.current.y - smoothPointer.current.y) * 0.08;

            const el = rootRef.current;
            if (el) {
                el.style.setProperty('--mx', smoothPointer.current.x.toFixed(4));
                el.style.setProperty('--my', smoothPointer.current.y.toFixed(4));
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, []);

    const handleProjectChange = (index: number) => {
        if (index === selectedProject) return;
        setIsAnimating(true);
        setTimeout(() => {
            setSelectedProject(index);
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setIsAnimating(false), 300);
        }, 150);
    };

    const project = projects[selectedProject];

    const gradientText = useMemo(() => {
        const accent = project.colors.accent ?? project.colors.secondary;
        return `linear-gradient(90deg, ${project.colors.primary}, ${project.colors.secondary}, ${accent})`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    const bgGradient = useMemo(() => {
        const accent = project.colors.accent ?? project.colors.secondary;
        return `radial-gradient(1200px 600px at 15% 20%, ${project.colors.primary}55 0%, transparent 60%),
                radial-gradient(900px 550px at 85% 30%, ${project.colors.secondary}55 0%, transparent 55%),
                radial-gradient(900px 650px at 55% 85%, ${accent}45 0%, transparent 60%),
                radial-gradient(1200px 900px at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 55%),
                linear-gradient(180deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.80) 60%, rgba(0,0,0,0.94) 100%)`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    const getTechIcon = (tech: string) => {
        const lower = tech.toLowerCase();
        if (lower.includes('react') || lower.includes('solid') || lower.includes('javascript') || lower.includes('html') || lower.includes('css') || lower.includes('tailwind') || lower.includes('typescript') || lower.includes('expo')) {
            return <Code2 className="w-4 h-4" />;
        }
        if (lower.includes('golang') || lower.includes('node') || lower.includes('parser')) {
            return <Terminal className="w-4 h-4" />;
        }
        if (lower.includes('postgres') || lower.includes('mongo') || lower.includes('firebase') || lower.includes('postgis')) {
            return <Database className="w-4 h-4" />;
        }
        return <Code2 className="w-4 h-4" />;
    };

    return (
        <div
            ref={rootRef}
            className="relative flex h-full w-full text-white overflow-hidden"
            onMouseMove={(e) => {
                const rect = rootRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
                targetPointer.current = { x, y };
            }}
            onMouseLeave={() => {
                targetPointer.current = { x: 0, y: 0 };
            }}
            style={{
                // CSS variables used by the lava background
                ['--mx' as any]: '0',
                ['--my' as any]: '0',
                ['--p1' as any]: project.colors.primary,
                ['--p2' as any]: project.colors.secondary,
                ['--p3' as any]: project.colors.accent ?? project.colors.secondary,
            }}
        >
            {/* Lava-lamp background (mouse-reactive) */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0" style={{ background: bgGradient }} />

                <div
                    className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-70 mix-blend-screen blur-3xl"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, var(--p1) 0%, transparent 62%)',
                        transform: 'translate(calc(var(--mx) * 40px), calc(var(--my) * 40px))',
                        animation: 'lavaDriftA 10s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute top-10 -right-48 h-[620px] w-[620px] rounded-full opacity-70 mix-blend-screen blur-3xl"
                    style={{
                        background: 'radial-gradient(circle at 40% 35%, var(--p2) 0%, transparent 60%)',
                        transform: 'translate(calc(var(--mx) * -52px), calc(var(--my) * 34px))',
                        animation: 'lavaDriftB 12s ease-in-out infinite',
                    }}
                />
                <div
                    className="absolute -bottom-52 left-1/3 h-[720px] w-[720px] rounded-full opacity-60 mix-blend-screen blur-3xl"
                    style={{
                        background: 'radial-gradient(circle at 45% 45%, var(--p3) 0%, transparent 62%)',
                        transform: 'translate(calc(var(--mx) * 38px), calc(var(--my) * -52px))',
                        animation: 'lavaDriftC 14s ease-in-out infinite',
                    }}
                />

                {/* Frosted veil */}
                <div className="absolute inset-0 bg-black/35 backdrop-blur-3xl" />

                {/* Subtle grain */}
                <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
                    }}
                />
            </div>

            {/* Sidebar */}
            <div className="relative z-10 w-72 p-4">
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                        <h2 className="text-base font-semibold flex items-center gap-2">
                            <Sparkles className="w-5 h-5" style={{ color: project.colors.secondary }} />
                            Project Showcase
                        </h2>
                        <p className="text-xs text-white/60 mt-1">Bold, animated, palette-driven</p>
                    </div>

                    <div className="p-3 flex flex-col gap-2">
                        {projects.map((proj, idx) => {
                            const accent = proj.colors.accent ?? proj.colors.secondary;
                            const itemGradient = `linear-gradient(135deg, ${proj.colors.primary}, ${proj.colors.secondary}, ${accent})`;
                            const active = selectedProject === idx;
                            return (
                                <button
                                    key={proj.id}
                                    onClick={() => handleProjectChange(idx)}
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
                                            {proj.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">{proj.name}</div>
                                            <div className="text-xs text-white/60">{proj.tagline}</div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div
                ref={containerRef}
                className={cn(
                    'relative z-10 flex-1 overflow-y-auto transition-opacity duration-300',
                    isAnimating ? 'opacity-0' : 'opacity-100'
                )}
            >
                {/* Hero */}
                <div className="px-8 pt-8">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]">
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
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 px-5 py-2.5 text-sm font-semibold transition-all"
                                            >
                                                Open project
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                        <div className="text-xs text-white/60 flex items-center gap-2">
                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                                            Move your mouse — background reacts
                                        </div>
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
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="px-8 py-10">
                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 overflow-hidden relative">
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
                                        <span
                                            key={tech}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/80"
                                        >
                                            {getTechIcon(tech)}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 overflow-hidden relative">
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
                                    {project.techStack.backend.map((tech) => (
                                        <span
                                            key={tech}
                                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/80"
                                        >
                                            {getTechIcon(tech)}
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screenshots */}
                <div className="px-8 pb-10">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 overflow-hidden">
                        <div className="flex items-end justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-extrabold">Screenshots</h2>
                                <p className="text-sm text-white/60 mt-1">UI snapshots (auto-fallback if missing)</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {project.screenshots.map((src, idx) => (
                                <div
                                    key={src}
                                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                                    style={{
                                        transform: 'translateZ(0)',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(135deg, ${project.colors.primary}55, ${project.colors.secondary}35, ${(project.colors.accent ?? project.colors.secondary)}30)`,
                                        }}
                                    />

                                    <div className="relative aspect-[9/16]">
                                        <img
                                            src={src}
                                            alt={`${project.name} screenshot ${idx + 1}`}
                                            className="absolute inset-0 h-full w-full object-cover"
                                            onError={(e) => {
                                                const img = e.currentTarget;
                                                img.style.display = 'none';
                                            }}
                                        />

                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-xs text-white/40">Screenshot {idx + 1}</div>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm text-white/90">
                                                <Play className="w-4 h-4" />
                                                Preview
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comment */}
                <div className="px-8 pb-10">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 overflow-hidden relative">
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
                                “{project.comment}”
                            </blockquote>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-8">
                    <div className="rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-2xl px-6 py-4 flex items-center justify-between">
                        <div className="text-xs text-white/60">Project {selectedProject + 1} / {projects.length}</div>
                        <div className="flex gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleProjectChange(idx)}
                                    className={cn(
                                        'h-2 rounded-full transition-all duration-300',
                                        selectedProject === idx ? 'w-8' : 'w-2 hover:w-4'
                                    )}
                                    style={{
                                        backgroundColor: selectedProject === idx ? project.colors.primary : 'rgba(255,255,255,0.25)',
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
                                Visit
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        ) : (
                            <div className="text-xs text-white/40">No public link</div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes lavaDriftA {
                    0%, 100% { transform: translate(calc(var(--mx) * 40px), calc(var(--my) * 40px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * 40px), calc(var(--my) * 40px)) translate(36px, -20px) scale(1.06); }
                }
                @keyframes lavaDriftB {
                    0%, 100% { transform: translate(calc(var(--mx) * -52px), calc(var(--my) * 34px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * -52px), calc(var(--my) * 34px)) translate(-26px, 28px) scale(1.08); }
                }
                @keyframes lavaDriftC {
                    0%, 100% { transform: translate(calc(var(--mx) * 38px), calc(var(--my) * -52px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * 38px), calc(var(--my) * -52px)) translate(18px, 30px) scale(1.07); }
                }
            `}</style>
        </div>
    );
}
