"use client";

import React from 'react';
import { Mail, Linkedin, Github, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactItem {
    icon: React.ElementType;
    label: string;
    value: string;
    href: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

interface MobileContactCardProps {
    item: ContactItem;
    index: number;
}

export function MobileContactCard({ item, index }: MobileContactCardProps) {
    const Icon = item.icon;

    return (
        <motion.a
            href={item.href}
            target={item.href.startsWith('http') || item.href.startsWith('/') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 p-5 ${item.bgColor} ${item.borderColor} border rounded-xl backdrop-blur-sm hover:shadow-lg transition-all`}
        >
            <div className={`w-14 h-14 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-7 h-7 ${item.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-white mb-1">{item.label}</p>
                <p className="text-sm text-gray-300 truncate">{item.value}</p>
            </div>
            <ExternalLink className={`w-5 h-5 ${item.color} flex-shrink-0`} />
        </motion.a>
    );
}

