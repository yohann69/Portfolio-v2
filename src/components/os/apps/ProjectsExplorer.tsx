"use client";

import React, { useState } from 'react';
import { Folder, FileCode, ChevronRight, Star, HardDrive, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/utils/cn';

type FileType = 'folder' | 'project' | 'contribution';

interface FileItem {
    id: string;
    name: string;
    type: FileType;
    description?: string;
    content?: React.ReactNode;
    tags?: string[];
    link?: string;
    image?: string;
}

const projects: FileItem[] = [
    {
        id: 'adn',
        name: 'Eligibilite_ADN',
        type: 'project',
        tags: ['Golang', 'SolidJS', 'PostGIS'],
        description: "Outil d'éligibilité à la fibre optique pour l'Ardèche et la Drôme.",
        link: "https://ardechedromenumerique.fr/eligibilite",
        image: "/adnlogo-300x262.png",
        content: "Application web permettant aux habitants de vérifier leur éligibilité à la fibre. Carte interactive, backend Go, frontend SolidJS."
    },
    {
        id: 'voyo',
        name: 'VOYO_App',
        type: 'project',
        tags: ['React Native', 'Golang', 'Firebase', 'PostgreSQL'],
        description: "Application mobile de mise en relation pour visites immobilières.",
        image: "/banner-voyo-full-wws.png",
        content: "Projet scolaire de groupe. App mobile Android/iOS. Backend Go, Chat Firebase, Base de données PostgreSQL avec PostGIS."
    },
    {
        id: 'ade',
        name: 'ADE_Calendar',
        type: 'project',
        tags: ['JavaScript', 'Golang', 'API'],
        description: "Interface responsive pour les emplois du temps de l'IUT.",
        link: "https://ade.pages.dev",
        image: "/calendaricon.png",
        content: "Site web palliant au manque d'interface responsive. API Golang pour parser l'ICS en JSON."
    }
];

const contributions: FileItem[] = [
    {
        id: 'xiaomi',
        name: 'Xiaomi_Community',
        type: 'contribution',
        tags: ['Community Management', 'Moderation'],
        description: "Modérateur de la communauté Xiaomi France.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
        content: "Animation de communauté, organisation d'événements, support utilisateurs. Membre de l'équipe photographie Xiaomi Global."
    },
    {
        id: 'translation',
        name: 'OpenSource_Translation',
        type: 'contribution',
        tags: ['Translation', 'Proton', '2FAS'],
        description: "Traduction de projets open source (Proton, 2FAS).",
        content: "Contribution bénévole à la traduction française de services utilisés quotidiennement."
    },
    {
        id: 'iot',
        name: 'IoT_Beta_Testing',
        type: 'contribution',
        tags: ['QA', 'IoT', 'Xiaomi Home'],
        description: "Tests de produits IoT et application Xiaomi Home.",
        image: "/mijalogo.png",
        content: "Test de versions beta, rapport de bugs, suggestions d'amélioration pour l'écosystème Xiaomi Home."
    }
];

export default function ProjectsExplorer() {
    const [currentPath, setCurrentPath] = useState<string>('/Projects');
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

    const currentItems = currentPath === '/Projects' ? projects :
        currentPath === '/Contributions' ? contributions :
            [...projects, ...contributions];

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-sans">
            {/* Sidebar */}
            <div className="w-48 bg-[#252526] border-r border-black/20 flex flex-col">
                <div className="p-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Explorer</div>

                <div className="flex flex-col gap-0.5">
                    <button
                        onClick={() => { setCurrentPath('/'); setSelectedFile(null); }}
                        className={cn("flex items-center gap-2 px-3 py-1.5 hover:bg-[#2a2d2e] text-sm", currentPath === '/' && "bg-[#37373d] text-white")}
                    >
                        <HardDrive className="w-4 h-4 text-yellow-500" />
                        <span>Root</span>
                    </button>

                    <button
                        onClick={() => { setCurrentPath('/Projects'); setSelectedFile(null); }}
                        className={cn("flex items-center gap-2 px-3 py-1.5 hover:bg-[#2a2d2e] text-sm", currentPath === '/Projects' && "bg-[#37373d] text-white")}
                    >
                        <Folder className="w-4 h-4 text-blue-400" />
                        <span>Projects</span>
                    </button>

                    <button
                        onClick={() => { setCurrentPath('/Contributions'); setSelectedFile(null); }}
                        className={cn("flex items-center gap-2 px-3 py-1.5 hover:bg-[#2a2d2e] text-sm", currentPath === '/Contributions' && "bg-[#37373d] text-white")}
                    >
                        <Folder className="w-4 h-4 text-green-400" />
                        <span>Contributions</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Breadcrumbs */}
                <div className="h-10 bg-[#1e1e1e] border-b border-black/20 flex items-center px-4 text-sm">
                    <span className="text-gray-500">root</span>
                    <ChevronRight className="w-4 h-4 text-gray-600 mx-1" />
                    <span className="text-white">{currentPath.replace('/', '') || 'All'}</span>
                </div>

                {/* File Grid */}
                <div className="flex-1 p-4 overflow-auto">
                    {currentPath === '/' ? (
                        <div className="grid grid-cols-4 gap-4">
                            <div
                                onClick={() => setCurrentPath('/Projects')}
                                className="flex flex-col items-center gap-2 p-4 rounded hover:bg-white/5 cursor-pointer transition-colors"
                            >
                                <Folder className="w-16 h-16 text-blue-400" />
                                <span className="text-sm">Projects</span>
                            </div>
                            <div
                                onClick={() => setCurrentPath('/Contributions')}
                                className="flex flex-col items-center gap-2 p-4 rounded hover:bg-white/5 cursor-pointer transition-colors"
                            >
                                <Folder className="w-16 h-16 text-green-400" />
                                <span className="text-sm">Contributions</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full gap-4">
                            {/* List */}
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedFile(item)}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-4 rounded border border-transparent hover:bg-white/5 cursor-pointer transition-all",
                                            selectedFile?.id === item.id ? "bg-white/10 border-white/20" : ""
                                        )}
                                    >
                                        {item.image ? (
                                            <div className="w-16 h-16 relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                        ) : (
                                            <FileCode className="w-16 h-16 text-blue-300" />
                                        )}
                                        <span className="text-sm text-center break-all">{item.name}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Preview Pane */}
                            {selectedFile && (
                                <div className="w-80 bg-[#252526] border-l border-black/20 p-6 flex flex-col h-full overflow-auto">
                                    <div className="w-full aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                        {selectedFile.image ? (
                                            <img src={selectedFile.image} alt={selectedFile.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <FileCode className="w-12 h-12 text-gray-600" />
                                        )}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{selectedFile.name}</h3>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {selectedFile.tags?.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                        {selectedFile.content || selectedFile.description}
                                    </p>

                                    {selectedFile.link && (
                                        <a
                                            href={selectedFile.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Open Project
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
