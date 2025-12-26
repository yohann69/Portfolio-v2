"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code2, Database, Globe, Smartphone, Terminal, ChevronRight, Play, Star, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useWindowManager } from '../WindowManager';

interface TechStack {
    frontend: string[];
    backend: string[];
}

interface ProjectData {
    id: string;
    name: string;
    logo: string;
    tagline: string;
    description: string;
    screenshots: string[];
    techStack: TechStack;
    link?: string;
    colors: {
        primary: string;
        secondary: string;
        accent?: string;
        gradient: string;
    };
    comment: string;
    year: string;
}

const projects: ProjectData[] = [
    {
        id: 'transat',
        name: 'Transat',
        logo: '/transatlogo.png',
        tagline: 'Your Journey, Reimagined',
        description: 'A next-generation travel companion that transforms how you plan, book, and experience your adventures. Seamlessly connect with travel enthusiasts worldwide.',
        screenshots: ['/transat1.png', '/transat2.png', '/transat3.png'],
        techStack: {
            frontend: ['React Native', 'Tailwind CSS'],
            backend: ['Golang', 'PostgreSQL']
        },
        link: 'https://transat.app',
        colors: {
            primary: '#FF6B35',
            secondary: '#4ECDC4',
            accent: '#FFE5B4',
            gradient: 'linear-gradient(135deg, #FF6B35 0%, #4ECDC4 50%, #FFE5B4 100%)'
        },
        comment: 'Built with performance and user experience in mind, Transat brings the joy of travel to your fingertips.',
        year: '2024'
    },
    {
        id: 'destimt',
        name: 'Destimt',
        logo: '/destimtlogo.png',
        tagline: 'Estimate Your Destination',
        description: 'An intelligent platform that helps you estimate travel costs, plan budgets, and discover hidden gems. Make informed decisions about your next destination.',
        screenshots: ['/destimt1.png', '/destimt2.png', '/destimt3.png'],
        techStack: {
            frontend: ['React', 'TypeScript'],
            backend: ['Golang', 'MongoDB']
        },
        link: 'https://destimt.io',
        colors: {
            primary: '#9B59B6',
            secondary: '#8E44AD',
            gradient: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 50%, #BB8FCE 100%)'
        },
        comment: 'Empowering travelers with data-driven insights and personalized recommendations.',
        year: '2023'
    },
    {
        id: 'adn',
        name: 'Eligibilité ADN',
        logo: '/adnlogo-300x262.png',
        tagline: 'Connecting Communities to Fiber',
        description: 'A comprehensive fiber optic eligibility platform for Ardèche and Drôme regions. Check availability, view coverage maps, and schedule installations with ease.',
        screenshots: ['/adn1.png', '/adn2.png', '/adn3.png'],
        techStack: {
            frontend: ['SolidJS', 'TypeScript'],
            backend: ['Golang', 'PostgreSQL', 'PostGIS']
        },
        link: 'https://ardechedromenumerique.fr/eligibilite',
        colors: {
            primary: '#3498DB',
            secondary: '#F1C40F',
            gradient: 'linear-gradient(135deg, #3498DB 0%, #2980B9 50%, #F1C40F 100%)'
        },
        comment: 'Bridging the digital divide with cutting-edge mapping technology and real-time availability data.',
        year: '2023'
    },
    {
        id: 'voyo',
        name: 'Voyo',
        logo: '/banner-voyo-full-wws.png',
        tagline: 'Property Viewing Redefined',
        description: 'A mobile marketplace connecting property seekers with hosts for authentic, guided property visits. Experience real estate in a whole new way.',
        screenshots: ['/voyo1.png', '/voyo2.png', '/voyo3.png'],
        techStack: {
            frontend: ['React Native', 'Expo'],
            backend: ['Node.js', 'MongoDB', 'Firebase']
        },
        colors: {
            primary: '#E67E22',
            secondary: '#D35400',
            accent: '#F39C12',
            gradient: 'linear-gradient(135deg, #E67E22 0%, #D35400 50%, #F39C12 100%)'
        },
        comment: 'Built during a collaborative school project, combining real-time chat and geolocation for seamless property tours.',
        year: '2023'
    },
    {
        id: 'ade',
        name: 'ADE Calendar',
        logo: '/calendaricon.png',
        tagline: 'Schedules Made Simple',
        description: 'A responsive, modern interface for university schedules. Access your timetable anytime, anywhere with a clean, intuitive design that works on all devices.',
        screenshots: ['/ade1.png', '/ade2.png', '/ade3.png'],
        techStack: {
            frontend: ['JavaScript', 'HTML', 'CSS'],
            backend: ['Golang', 'ICS Parser']
        },
        link: 'https://ade.pages.dev',
        colors: {
            primary: '#3498DB',
            secondary: '#2C3E50',
            accent: '#5DADE2',
            gradient: 'linear-gradient(135deg, #3498DB 0%, #2C3E50 50%, #5DADE2 100%)'
        },
        comment: 'Addressing the lack of mobile-friendly schedule viewers with a fast, accessible solution.',
        year: '2023'
    }
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
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

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
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                const progress = scrollTop / (scrollHeight - clientHeight);
                setScrollProgress(progress);
            }
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
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
        <div className="flex h-full bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900/50 backdrop-blur-xl border-r border-white/10 flex flex-col p-4 gap-2">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-1 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Projects
                    </h2>
                    <p className="text-xs text-gray-400">Featured work & innovations</p>
                </div>
                
                {projects.map((proj, idx) => (
                    <button
                        key={proj.id}
                        onClick={() => handleProjectChange(idx)}
                        className={cn(
                            "relative group text-left p-3 rounded-xl transition-all duration-300",
                            "hover:scale-[1.02] active:scale-[0.98]",
                            selectedProject === idx
                                ? "bg-white/10 shadow-lg"
                                : "bg-white/5 hover:bg-white/10"
                        )}
                        style={{
                            borderLeft: selectedProject === idx ? `3px solid ${proj.colors.primary}` : '3px solid transparent'
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shadow-lg"
                                style={{ 
                                    background: proj.colors.gradient,
                                }}
                            >
                                {proj.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{proj.name}</div>
                                <div className="text-xs text-gray-400">{proj.year}</div>
                            </div>
                        </div>
                        
                        {selectedProject === idx && (
                            <div 
                                className="absolute inset-0 rounded-xl opacity-20 blur-xl"
                                style={{ background: proj.colors.gradient }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div 
                ref={containerRef}
                className={cn(
                    "flex-1 overflow-y-auto transition-opacity duration-300",
                    isAnimating ? "opacity-0" : "opacity-100"
                )}
            >
                {/* Hero Section */}
                <div 
                    className="relative min-h-[70vh] flex flex-col items-center justify-center p-12 overflow-hidden"
                    style={{ background: project.colors.gradient }}
                >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        {/* Logo */}
                        <div className="mb-8 flex justify-center">
                            <div 
                                className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/30"
                                style={{
                                    animation: 'float 6s ease-in-out infinite'
                                }}
                            >
                                <div className="text-5xl font-bold" style={{ color: 'white' }}>
                                    {project.name.substring(0, 2)}
                                </div>
                            </div>
                        </div>

                        <h1 className="text-7xl font-bold mb-4 tracking-tight">
                            {project.name}
                        </h1>
                        
                        <p className="text-3xl mb-8 font-light text-white/90">
                            {project.tagline}
                        </p>

                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
                            {project.description}
                        </p>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 border border-white/30 shadow-2xl"
                            >
                                Visit Project
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                        <ChevronRight className="w-6 h-6 rotate-90 text-white/60" />
                    </div>
                </div>

                {/* Tech Stack Section */}
                <div className="bg-zinc-950 py-20 px-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">Built with Excellence</h2>
                            <p className="text-xl text-gray-400">Cutting-edge technologies for optimal performance</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Frontend */}
                            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-blue-500/20">
                                            <Code2 className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">Frontend</h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {project.techStack.frontend.map((tech, idx) => (
                                            <div 
                                                key={idx}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                {getTechIcon(tech)}
                                                <span className="text-lg">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Backend */}
                            <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                
                                <div className="relative">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 rounded-xl bg-green-500/20">
                                            <Database className="w-6 h-6 text-green-400" />
                                        </div>
                                        <h3 className="text-2xl font-semibold">Backend</h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {project.techStack.backend.map((tech, idx) => (
                                            <div 
                                                key={idx}
                                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                {getTechIcon(tech)}
                                                <span className="text-lg">{tech}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Screenshots Section */}
                <div className="py-20 px-12" style={{ background: `linear-gradient(to bottom, #09090b, ${project.colors.primary}15)` }}>
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">Experience in Action</h2>
                            <p className="text-xl text-gray-400">A glimpse into the interface</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.screenshots.map((screenshot, idx) => (
                                <div 
                                    key={idx}
                                    className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                                    style={{
                                        animationDelay: `${idx * 100}ms`,
                                        animation: 'fadeInUp 0.6s ease-out forwards'
                                    }}
                                >
                                    <div className="aspect-[9/16] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                                        <div className="text-gray-600 text-sm">Screenshot {idx + 1}</div>
                                    </div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <Play className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comment Section */}
                <div className="py-20 px-12 bg-zinc-950">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <Star className="w-16 h-16 mx-auto text-yellow-400 fill-yellow-400" />
                        </div>
                        
                        <blockquote className="text-3xl font-light leading-relaxed mb-8 text-gray-300">
                            "{project.comment}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.colors.primary }} />
                                <span>Project Highlight</span>
                            </div>
                            <span>•</span>
                            <span>{project.year}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="py-12 px-12 bg-black border-t border-white/10">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Project {selectedProject + 1} of {projects.length}
                        </div>
                        
                        <div className="flex gap-2">
                            {projects.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleProjectChange(idx)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all duration-300",
                                        selectedProject === idx ? "w-8 bg-white" : "bg-white/30 hover:bg-white/50"
                                    )}
                                />
                            ))}
                        </div>
                        
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                            >
                                Visit Website
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
