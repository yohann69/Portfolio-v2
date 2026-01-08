"use client";

import React from 'react';
import Image from 'next/image';
import { Mail, Linkedin, Github, FileText, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/utils/translations';

export function MobileHero() {
    const { t, language } = useSettings();

    const getTranslation = (key: string) => {
        const lang = language || 'en';
        return translations[lang as keyof typeof translations]?.[key as keyof typeof translations[typeof lang]] || key;
    };

    const socialLinks = [
        {
            icon: Mail,
            href: 'mailto:yohann.chavanel@proton.me',
            label: 'Email',
            color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        },
        {
            icon: Linkedin,
            href: 'https://www.linkedin.com/in/yohann-chavanel/',
            label: 'LinkedIn',
            color: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
        },
        {
            icon: Github,
            href: 'https://github.com/yohann69',
            label: 'GitHub',
            color: 'bg-gray-700/20 text-gray-300 border-gray-700/30',
        },
    ];

    return (
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => {
                    const randomX = typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 400;
                    const randomY = typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 600;
                    return (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
                            initial={{
                                x: randomX,
                                y: randomY,
                            }}
                            animate={{
                                y: [null, -100, null],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                {/* Profile Image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mb-6"
                >
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                        <Image
                            src="/mevertical.jpg"
                            alt="Yohann CHAVANEL"
                            width={160}
                            height={160}
                            className="object-cover w-full h-full"
                            priority
                        />
                    </div>
                    <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                </motion.div>

                {/* Name and Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                >
                    Yohann CHAVANEL
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg text-gray-300 mb-2"
                >
                    {getTranslation('sysinfo.job.title')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-400 mb-8"
                >
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Available for opportunities</span>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center gap-4 mb-8"
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                            className={`w-12 h-12 rounded-full ${link.color} border flex items-center justify-center transition-all hover:shadow-lg`}
                        >
                            <link.icon className="w-5 h-5" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.a
                    href="/CV_2024_Yohann_CHAVANEL.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-medium shadow-lg hover:shadow-green-500/50 transition-all"
                >
                    <Download className="w-5 h-5" />
                    <span>Download CV</span>
                </motion.a>
            </motion.div>
        </div>
    );
}

