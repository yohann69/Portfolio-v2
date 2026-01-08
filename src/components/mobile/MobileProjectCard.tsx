"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronDown, ChevronUp, Code, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from '../os/apps/project-showcase/types';
import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/utils/translations';

interface MobileProjectCardProps {
    project: ProjectData;
    index: number;
}

export function MobileProjectCard({ project, index }: MobileProjectCardProps) {
    const { language } = useSettings();
    const [isExpanded, setIsExpanded] = useState(false);

    const getTranslation = (key: string) => {
        const lang = language || 'en';
        return translations[lang as keyof typeof translations]?.[key as keyof typeof translations[typeof lang]] || key;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
        >
            {/* Project Header */}
            <div className="p-5">
                <div className="flex items-start gap-4 mb-4">
                    {project.logoSrc && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                            <Image
                                src={project.logoSrc}
                                alt={project.name}
                                width={80}
                                height={80}
                                className="object-contain bg-white/5 p-2"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{project.name}</h3>
                            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-full whitespace-nowrap">
                                {project.year}
                            </span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {getTranslation(project.descriptionKey)}
                        </p>
                    </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.frontend.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                        >
                            <Code className="w-3 h-3" />
                            {tech}
                        </span>
                    ))}
                    {project.techStack.backend.length > 0 && project.techStack.backend.map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                        >
                            <Server className="w-3 h-3" />
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>View Project</span>
                        </a>
                    )}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-300" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-300" />
                        )}
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-4 border-t border-white/10 pt-5">
                            {/* Story */}
                            {project.story && (
                                <div>
                                    <h4 className="text-sm font-bold text-green-400 mb-2">
                                        {getTranslation(project.story.titleKey)}
                                    </h4>
                                    {project.story.bodyKeys.map((key, i) => (
                                        <p key={i} className="text-sm text-gray-300 leading-relaxed mb-2">
                                            {getTranslation(key)}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {/* Screenshots Preview */}
                            {project.screenshots && project.screenshots.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-green-400 mb-3">Screenshots</h4>
                                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {project.screenshots.slice(0, 3).map((screenshot, i) => (
                                            <div
                                                key={i}
                                                className="relative w-32 h-48 rounded-lg overflow-hidden flex-shrink-0 border border-white/10"
                                            >
                                                <Image
                                                    src={screenshot}
                                                    alt={`${project.name} screenshot ${i + 1}`}
                                                    width={128}
                                                    height={192}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

