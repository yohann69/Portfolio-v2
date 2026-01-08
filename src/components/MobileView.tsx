"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Monitor, Mail, Linkedin, Github, FileText, Briefcase, GraduationCap, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { PROJECTS } from './os/apps/project-showcase/data';
import { translations } from '@/utils/translations';

const events = [
    {
        id: 1,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Alternant développeur',
        company: 'La Poste',
        type: 'work',
        description: "Contrat d'apprentissage de 3 ans pour devenir développeur full stack. Mise en pratique des compétences acquises et formation continue en développement web et gestion de projet."
    },
    {
        id: 2,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Ingénieur informatique',
        company: 'IMT Atlantique',
        type: 'education',
        description: "Formation d'ingénieur informatique, spécialité Ingénierie Logicielle. Approfondissement des connaissances en programmation et développement de compétences professionnelles."
    },
    {
        id: 3,
        date: '2024-02',
        endDate: '2024-02',
        title: 'Participation au MWC',
        company: 'Barcelone',
        type: 'event',
        description: "Invité au Mobile World Congress et au lancement de la série Xiaomi 14. Membre de l'équipe photographie Xiaomi Global."
    },
    {
        id: 4,
        date: '2023-09',
        endDate: '2024-07',
        title: 'Alternant développeur full stack',
        company: 'Ardèche Drome Numérique',
        type: 'work',
        description: "Développement de solutions internes en Go, SolidJS et PostGIS. Contribution à l'outil d'éligibilité fibre."
    },
    {
        id: 5,
        date: '2021-09',
        endDate: '2024-07',
        title: 'BUT Informatique',
        company: 'IUT de Valence',
        type: 'education',
        description: "Acquisition de compétences solides en programmation, développement web et gestion de projet. Alternance en 3ème année."
    }
];

export default function MobileView() {
    const { t, language } = useSettings();
    const [activeSection, setActiveSection] = useState<'about' | 'projects' | 'experience' | 'contact'>('about');

    const getTranslation = (key: string) => {
        const lang = language || 'en';
        return translations[lang as keyof typeof translations]?.[key as keyof typeof translations[typeof lang]] || key;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Banner Notice */}
            <div className="bg-yellow-500/20 border-b border-yellow-500/30 px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2 text-sm">
                    <Monitor className="w-4 h-4 text-yellow-400" />
                    <p className="text-yellow-200">
                        {getTranslation('mobile.banner') || 'For the best experience, please use a PC or tablet'}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'about', label: getTranslation('mobile.nav.about') || 'About' },
                        { id: 'projects', label: getTranslation('mobile.nav.projects') || 'Projects' },
                        { id: 'experience', label: getTranslation('mobile.nav.experience') || 'Experience' },
                        { id: 'contact', label: getTranslation('mobile.nav.contact') || 'Contact' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as any)}
                            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                activeSection === item.id
                                    ? 'border-blue-500 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-white'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Content */}
            <div className="pb-20">
                {activeSection === 'about' && (
                    <div className="p-6 space-y-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                <Image
                                    src="/mevertical.jpg"
                                    alt="Yohann CHAVANEL"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-green-400 mb-2">Yohann CHAVANEL</h1>
                            <p className="text-sm text-gray-400 mb-6">{getTranslation('sysinfo.job.title')}</p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                                {getTranslation('sysinfo.bio.title')}
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                {getTranslation('sysinfo.bio.text')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                                {getTranslation('sysinfo.skills.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {['JavaScript', 'NodeJS', 'HTML5', 'CSS3', 'Python', 'PHP', 'Java', 'C', 'MySQL', 'PostgreSQL', 'MongoDB', 'Go', 'Rust'].map(skill => (
                                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                                {getTranslation('sysinfo.tools.title')}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {['VS Code', 'Jetbrains', 'Git', 'Docker', 'Linux', 'Figma'].map(tool => (
                                    <div key={tool} className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'projects' && (
                    <div className="p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">
                            {getTranslation('mobile.projects.title') || 'Projects'}
                        </h2>
                        {PROJECTS.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-start gap-4 mb-3">
                                    {project.logoSrc && (
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={project.logoSrc}
                                                alt={project.name}
                                                width={64}
                                                height={64}
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                                        <p className="text-xs text-gray-400 mb-2">{project.year}</p>
                                        <p className="text-sm text-gray-300">
                                            {getTranslation(project.descriptionKey)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.techStack.frontend.map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.backend.map((tech) => (
                                        <span key={tech} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {getTranslation('showcase.open') || 'View Project'}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'experience' && (
                    <div className="p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">
                            {getTranslation('timeline.title')}
                        </h2>
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.id} className="relative pl-8 border-l-2 border-gray-700">
                                    <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-blue-500 border-2 border-black" />
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-bold text-blue-400">
                                                {event.date} → {event.endDate}
                                            </span>
                                            {event.type === 'work' ? (
                                                <Briefcase className="w-4 h-4 text-gray-400" />
                                            ) : event.type === 'education' ? (
                                                <GraduationCap className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                                        <p className="text-sm text-green-400 font-medium mb-2">@{event.company}</p>
                                        <p className="text-sm text-gray-300 leading-relaxed">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeSection === 'contact' && (
                    <div className="p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-green-400 mb-6">
                            {getTranslation('mobile.contact.title') || 'Get in Touch'}
                        </h2>
                        <div className="space-y-4">
                            <a
                                href="mailto:yohann.chavanel@proton.me"
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">Email</p>
                                    <p className="text-sm text-gray-400">yohann.chavanel@proton.me</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/yohann-chavanel/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center">
                                    <Linkedin className="w-6 h-6 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">LinkedIn</p>
                                    <p className="text-sm text-gray-400">linkedin.com/in/yohann-chavanel</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </a>

                            <a
                                href="https://github.com/yohann69"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-700/20 flex items-center justify-center">
                                    <Github className="w-6 h-6 text-gray-300" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">GitHub</p>
                                    <p className="text-sm text-gray-400">github.com/yohann69</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </a>

                            <a
                                href="/CV_2024_Yohann_CHAVANEL.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-red-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-white">CV / Resume</p>
                                    <p className="text-sm text-gray-400">Download PDF</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

