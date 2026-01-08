"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Monitor, User, Briefcase, Mail, Home, Sparkles, Linkedin, Github, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { PROJECTS } from './os/apps/project-showcase/data';
import { translations } from '@/utils/translations';
import { MobileHero } from './mobile/MobileHero';
import { MobileProjectCard } from './mobile/MobileProjectCard';
import { MobileExperienceItem } from './mobile/MobileExperienceItem';
import { MobileContactCard } from './mobile/MobileContactCard';

const events = [
    {
        id: 1,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Alternant développeur',
        company: 'La Poste',
        type: 'work' as const,
        description: "Contrat d'apprentissage de 3 ans pour devenir développeur full stack. Mise en pratique des compétences acquises et formation continue en développement web et gestion de projet."
    },
    {
        id: 2,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Ingénieur informatique',
        company: 'IMT Atlantique',
        type: 'education' as const,
        description: "Formation d'ingénieur informatique, spécialité Ingénierie Logicielle. Approfondissement des connaissances en programmation et développement de compétences professionnelles."
    },
    {
        id: 3,
        date: '2024-02',
        endDate: '2024-02',
        title: 'Participation au MWC',
        company: 'Barcelone',
        type: 'event' as const,
        description: "Invité au Mobile World Congress et au lancement de la série Xiaomi 14. Membre de l'équipe photographie Xiaomi Global."
    },
    {
        id: 4,
        date: '2023-09',
        endDate: '2024-07',
        title: 'Alternant développeur full stack',
        company: 'Ardèche Drome Numérique',
        type: 'work' as const,
        description: "Développement de solutions internes en Go, SolidJS et PostGIS. Contribution à l'outil d'éligibilité fibre."
    },
    {
        id: 5,
        date: '2021-09',
        endDate: '2024-07',
        title: 'BUT Informatique',
        company: 'IUT de Valence',
        type: 'education' as const,
        description: "Acquisition de compétences solides en programmation, développement web et gestion de projet. Alternance en 3ème année."
    }
];

const contactItems = [
    {
        icon: Mail,
        label: 'Email',
        value: 'yohann.chavanel@proton.me',
        href: 'mailto:yohann.chavanel@proton.me',
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/yohann-chavanel',
        href: 'https://www.linkedin.com/in/yohann-chavanel/',
        color: 'text-blue-400',
        bgColor: 'bg-blue-600/10',
        borderColor: 'border-blue-600/30',
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'github.com/yohann69',
        href: 'https://github.com/yohann69',
        color: 'text-gray-300',
        bgColor: 'bg-gray-700/10',
        borderColor: 'border-gray-700/30',
    },
    {
        icon: FileText,
        label: 'CV / Resume',
        value: 'Download PDF',
        href: '/CV_2024_Yohann_CHAVANEL.pdf',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
    },
];

export default function MobileView() {
    const { t, language } = useSettings();
    const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'projects' | 'experience' | 'contact'>('hero');
    const [showNav, setShowNav] = useState(true);
    const lastScrollY = useRef(0);
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const getTranslation = (key: string) => {
        const lang = language || 'en';
        return translations[lang as keyof typeof translations]?.[key as keyof typeof translations[typeof lang]] || key;
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show/hide nav on scroll
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setShowNav(false);
            } else {
                setShowNav(true);
            }
            lastScrollY.current = currentScrollY;

            // Update active section based on scroll position
            const scrollPosition = currentScrollY + 200;
            for (const [section, element] of Object.entries(sectionsRef.current)) {
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section as any);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (section: string) => {
        const element = sectionsRef.current[section];
        if (element) {
            const navHeight = 60;
            const elementPosition = element.offsetTop - navHeight;
            window.scrollTo({ top: elementPosition, behavior: 'smooth' });
            setActiveSection(section as any);
        }
    };

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'experience', label: 'Experience', icon: Briefcase },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white scroll-smooth">
            {/* Banner Notice */}
            <div className="bg-yellow-500/20 border-b border-yellow-500/30 px-4 py-2.5 text-center">
                <div className="flex items-center justify-center gap-2 text-xs">
                    <Monitor className="w-3.5 h-3.5 text-yellow-400" />
                    <p className="text-yellow-200">
                        {getTranslation('mobile.banner') || 'For the best experience, please use a PC or tablet'}
                    </p>
                </div>
            </div>

            {/* Sticky Navigation */}
            <AnimatePresence>
                {showNav && (
                    <motion.nav
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
                    >
                        <div className="flex overflow-x-auto scrollbar-hide px-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                                            isActive
                                                ? 'border-green-400 text-green-400'
                                                : 'border-transparent text-gray-400'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section
                ref={(el) => (sectionsRef.current.hero = el)}
                id="hero"
                className="min-h-screen"
            >
                <MobileHero />
            </section>

            {/* About Section */}
            <section
                ref={(el) => (sectionsRef.current.about = el)}
                id="about"
                className="py-16 px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-green-400 mb-6 flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        {getTranslation('sysinfo.bio.title')}
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-8 text-base">
                        {getTranslation('sysinfo.bio.text')}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                                {getTranslation('sysinfo.skills.title')}
                            </h3>
                            <div className="space-y-2">
                                {['JavaScript', 'NodeJS', 'HTML5', 'CSS3', 'Python', 'PHP', 'Java', 'C', 'MySQL', 'PostgreSQL', 'MongoDB', 'Go', 'Rust'].map(skill => (
                                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-green-400 mb-4 border-b border-green-500/30 pb-2">
                                {getTranslation('sysinfo.tools.title')}
                            </h3>
                            <div className="space-y-2">
                                {['VS Code', 'Jetbrains', 'Git', 'Docker', 'Linux', 'Figma'].map(tool => (
                                    <div key={tool} className="flex items-center gap-2 text-sm text-gray-400">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Projects Section */}
            <section
                ref={(el) => (sectionsRef.current.projects = el)}
                id="projects"
                className="py-16 px-6 bg-white/5"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-2">
                        <Briefcase className="w-6 h-6" />
                        {getTranslation('mobile.projects.title') || 'Projects'}
                    </h2>
                    <div className="space-y-6">
                        {PROJECTS.map((project, index) => (
                            <MobileProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Experience Section */}
            <section
                ref={(el) => (sectionsRef.current.experience = el)}
                id="experience"
                className="py-16 px-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-2">
                        <Briefcase className="w-6 h-6" />
                        {getTranslation('timeline.title')}
                    </h2>
                    <div className="space-y-6">
                        {events.map((event, index) => (
                            <MobileExperienceItem key={event.id} event={event} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <section
                ref={(el) => (sectionsRef.current.contact = el)}
                id="contact"
                className="py-16 px-6 bg-white/5"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-3xl font-bold text-green-400 mb-8 flex items-center gap-2">
                        <Mail className="w-6 h-6" />
                        {getTranslation('mobile.contact.title') || 'Get in Touch'}
                    </h2>
                    <div className="space-y-4">
                        {contactItems.map((item, index) => (
                            <MobileContactCard key={item.label} item={item} index={index} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 text-center text-gray-400 text-sm border-t border-white/10">
                <p>© 2024 Yohann CHAVANEL. All rights reserved.</p>
                <p className="mt-2">Designed and built with ❤️</p>
            </footer>
        </div>
    );
}
