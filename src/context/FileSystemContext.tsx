"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    Gamepad2,
    FileText,
    Play,
    Globe,
} from 'lucide-react';

export type FileType = 'folder' | 'project' | 'contribution' | 'app' | 'pdf' | 'video' | 'image' | 'txt';

export interface FileItem {
    id: string;
    name: string;
    type: FileType;
    description?: string;
    content?: React.ReactNode; // For complex content like projects
    textContent?: string; // For simple text files
    tags?: string[];
    link?: string;
    image?: string;
    appId?: string; // For launching apps
    size?: string;
    date?: string;
    icon?: React.ElementType;
    url?: string; // For media files or browser
    translationKey?: string; // For translating name
    descriptionKey?: string; // For translating description
    contentKey?: string; // For translating content
    targetPath?: string; // For shortcuts
}

interface FileSystemContextType {
    fileSystem: Record<string, FileItem[]>;
    createFile: (path: string, file: FileItem) => void;
    updateFileContent: (path: string, fileId: string, content: string) => void;
    renameFile: (path: string, fileId: string, newName: string) => void;
    deleteFile: (path: string, fileId: string) => void;
    getFile: (path: string, fileId: string) => FileItem | undefined;
    findFile: (fileId: string) => { file: FileItem, path: string } | undefined;
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

const initialFileSystem: Record<string, FileItem[]> = {
    '/': [
        { id: 'home', name: 'Home', type: 'folder', date: 'Today', translationKey: 'explorer.home', targetPath: '/home' },
        { id: 'desktop', name: 'Desktop', type: 'folder', date: 'Today', translationKey: 'explorer.desktop', targetPath: '/desktop' },
        { id: 'documents', name: 'Documents', type: 'folder', date: 'Today', translationKey: 'explorer.documents', targetPath: '/documents' },
        { id: 'downloads', name: 'Downloads', type: 'folder', date: 'Yesterday', translationKey: 'explorer.downloads', targetPath: '/downloads' },
        { id: 'applications', name: 'Applications', type: 'folder', date: '2024-01-01', translationKey: 'explorer.applications', targetPath: '/applications' },
        { id: 'gallery', name: 'Gallery', type: 'folder', date: '2024-01-01', translationKey: 'app.gallery', targetPath: '/gallery' },
    ],
    '/home': [
        { id: 'desktop', name: 'Desktop', type: 'folder', date: 'Today', translationKey: 'explorer.desktop', targetPath: '/desktop' },
        { id: 'documents', name: 'Documents', type: 'folder', date: 'Today', translationKey: 'explorer.documents', targetPath: '/documents' },
        { id: 'downloads', name: 'Downloads', type: 'folder', date: 'Yesterday', translationKey: 'explorer.downloads', targetPath: '/downloads' },
        { id: 'applications', name: 'Applications', type: 'folder', date: '2024-01-01', translationKey: 'explorer.applications', targetPath: '/applications' },
        { id: 'gallery', name: 'Gallery', type: 'folder', date: '2024-01-01', translationKey: 'app.gallery', targetPath: '/gallery' },
    ],
    '/desktop': [],
    '/documents': [
        { id: 'projects', name: 'Projects', type: 'folder', date: 'Today', translationKey: 'app.projects' },
        { id: 'contributions', name: 'Contributions', type: 'folder', date: 'Last week', translationKey: 'content.contributions.desc' },
        { id: 'cv', name: 'CV_Yohann_CHAVANEL.pdf', type: 'pdf', size: '2.4 MB', date: '2024-03-15', url: '/CV_2024_Yohann_CHAVANEL.pdf', translationKey: 'content.cv' }
    ],
    '/downloads': [
        { id: 'rick', name: 'secret_video.mp4', type: 'video', size: '15 MB', date: '2024-04-01', url: '/rr.mp4', translationKey: 'content.secret' }
    ],
    '/applications': [
        { id: 'snake-app', name: 'Snake Game', type: 'app', appId: 'snake', icon: Gamepad2, description: 'Classic Snake Game', size: '1.2 MB', date: '2024-01-01', translationKey: 'app.snake' },
        { id: 'browser-app', name: 'Web Browser', type: 'app', appId: 'browser', icon: Globe, description: 'Internet Explorer... but faster', size: '50 MB', date: '2024-01-01', translationKey: 'app.browser' },
        { id: 'pdf-app', name: 'PDF Viewer', type: 'app', appId: 'pdf-viewer', icon: FileText, description: 'View PDF documents', size: '10 MB', date: '2024-01-01', translationKey: 'app.pdf' },
        { id: 'video-app', name: 'Video Player', type: 'app', appId: 'video-player', icon: Play, description: 'Play video files', size: '20 MB', date: '2024-01-01', translationKey: 'app.video' },
    ],
    '/gallery': [
        { id: 'img1', name: 'Image 1', type: 'image', size: '2.1 MB', date: '2023-12-01', image: "https://i.imgur.com/T5TkJpy.jpeg" },
        { id: 'img2', name: 'Image 2', type: 'image', size: '1.5 MB', date: '2023-12-05', image: "https://i.imgur.com/D8hNFOO.jpeg" },
        { id: 'img3', name: 'Image 3', type: 'image', size: '3.2 MB', date: '2023-12-10', image: "https://i.imgur.com/otXQSG6.jpeg" },
        { id: 'img4', name: 'Image 4', type: 'image', size: '2.8 MB', date: '2023-12-12', image: "https://i.imgur.com/8ZRK2ll.jpeg" },
        { id: 'img5', name: 'Image 5', type: 'image', size: '1.9 MB', date: '2023-12-15', image: "https://i.imgur.com/GMjjoK9.jpeg" },
        { id: 'img6', name: 'Image 6', type: 'image', size: '2.5 MB', date: '2023-12-18', image: "https://i.imgur.com/eyNajEN.jpeg" },
        { id: 'img7', name: 'Image 7', type: 'image', size: '3.0 MB', date: '2023-12-20', image: "https://i.imgur.com/m4IATPa.jpeg" },
        { id: 'img8', name: 'Image 8', type: 'image', size: '2.2 MB', date: '2023-12-22', image: "https://i.imgur.com/SAk0orU.jpeg" },
        { id: 'img9', name: 'Image 9', type: 'image', size: '1.8 MB', date: '2023-12-25', image: "https://i.imgur.com/5u53X9s.jpeg" },
        { id: 'img10', name: 'Image 10', type: 'image', size: '2.6 MB', date: '2023-12-28', image: "https://i.imgur.com/rVthYYW.jpeg" },
    ],
    '/documents/projects': [
        {
            id: 'transat',
            name: 'Transat',
            type: 'project',
            appId: 'project-showcase',
            icon: Globe,
            tags: ['React Native', 'Tailwind', 'Golang', 'PostgreSQL'],
            description: "A next-generation travel companion that transforms how you plan and experience your adventures.",
            descriptionKey: 'project.transat.desc',
            image: "/transatlogo.png",
            content: "Built with performance and user experience in mind, Transat brings the joy of travel to your fingertips.",
            contentKey: 'project.transat.content',
            size: '35 MB',
            date: '2024-03-10'
        },
        {
            id: 'destimt',
            name: 'Destimt',
            type: 'project',
            appId: 'project-showcase',
            icon: Globe,
            tags: ['React', 'Golang', 'MongoDB'],
            description: "An intelligent platform that helps you estimate travel costs and discover hidden gems.",
            descriptionKey: 'project.destimt.desc',
            image: "/destimtlogo.png",
            content: "Empowering travelers with data-driven insights and personalized recommendations.",
            contentKey: 'project.destimt.content',
            size: '28 MB',
            date: '2023-12-15'
        },
        {
            id: 'adn',
            name: 'Eligibilite_ADN',
            type: 'project',
            appId: 'project-showcase',
            icon: Globe,
            tags: ['Golang', 'SolidJS', 'PostGIS'],
            description: "Outil d'éligibilité à la fibre optique pour l'Ardèche et la Drôme.",
            descriptionKey: 'project.adn.desc',
            url: "https://ardechedromenumerique.fr/eligibilite",
            image: "/adnlogo-300x262.png",
            content: "Application web permettant aux habitants de vérifier leur éligibilité à la fibre. Carte interactive, backend Go, frontend SolidJS.",
            contentKey: 'project.adn.content',
            size: '15 MB',
            date: '2023-11-20'
        },
        {
            id: 'voyo',
            name: 'VOYO_App',
            type: 'project',
            appId: 'project-showcase',
            icon: Globe,
            tags: ['React Native', 'Golang', 'Firebase', 'PostgreSQL'],
            description: "Application mobile de mise en relation pour visites immobilières.",
            descriptionKey: 'project.voyo.desc',
            image: "/banner-voyo-full-wws.png",
            content: "Projet scolaire de groupe. App mobile Android/iOS. Backend Go, Chat Firebase, Base de données PostgreSQL avec PostGIS.",
            contentKey: 'project.voyo.content',
            size: '45 MB',
            date: '2023-06-15'
        },
        {
            id: 'ade',
            name: 'ADE_Calendar',
            type: 'project',
            appId: 'project-showcase',
            icon: Globe,
            tags: ['JavaScript', 'Golang', 'API'],
            description: "Interface responsive pour les emplois du temps de l'IUT.",
            descriptionKey: 'project.ade.desc',
            url: "https://ade.pages.dev",
            image: "/calendaricon.png",
            content: "Site web palliant au manque d'interface responsive. API Golang pour parser l'ICS en JSON.",
            contentKey: 'project.ade.content',
            size: '2 MB',
            date: '2023-09-01'
        }
    ],
    '/documents/contributions': [
        {
            id: 'xiaomi',
            name: 'Xiaomi_Community',
            type: 'contribution',
            tags: ['Community Management', 'Moderation'],
            description: "Modérateur de la communauté Xiaomi France.",
            descriptionKey: 'contribution.xiaomi.desc',
            image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
            content: "Animation de communauté, organisation d'événements, support utilisateurs. Membre de l'équipe photographie Xiaomi Global.",
            contentKey: 'contribution.xiaomi.content',
            date: 'Ongoing'
        },
        {
            id: 'translation',
            name: 'OpenSource_Translation',
            type: 'contribution',
            tags: ['Translation', 'Proton', '2FAS'],
            description: "Traduction de projets open source (Proton, 2FAS).",
            descriptionKey: 'contribution.translation.desc',
            content: "Contribution bénévole à la traduction française de services utilisés quotidiennement.",
            contentKey: 'contribution.translation.content',
            date: 'Ongoing'
        },
        {
            id: 'iot',
            name: 'IoT_Beta_Testing',
            type: 'contribution',
            tags: ['QA', 'IoT', 'Xiaomi Home'],
            description: "Tests de produits IoT et application Xiaomi Home.",
            descriptionKey: 'contribution.iot.desc',
            image: "/mijalogo.png",
            content: "Test de versions beta, rapport de bugs, suggestions d'amélioration pour l'écosystème Xiaomi Home.",
            contentKey: 'contribution.iot.content',
            date: 'Ongoing'
        }
    ]
};

export const FileSystemProvider = ({ children }: { children: React.ReactNode }) => {
    const [fileSystem, setFileSystem] = useState<Record<string, FileItem[]>>(initialFileSystem);

    const createFile = useCallback((path: string, file: FileItem) => {
        setFileSystem(prev => {
            const currentFiles = prev[path] || [];
            // Check if file already exists and rename if necessary
            let newName = file.name;
            let counter = 1;
            while (currentFiles.some(f => f.name === newName)) {
                const nameParts = file.name.split('.');
                if (nameParts.length > 1) {
                    const ext = nameParts.pop();
                    newName = `${nameParts.join('.')} (${counter}).${ext}`;
                } else {
                    newName = `${file.name} (${counter})`;
                }
                counter++;
            }

            const newFile = { ...file, name: newName };
            return {
                ...prev,
                [path]: [...currentFiles, newFile]
            };
        });
    }, []);

    const updateFileContent = useCallback((path: string, fileId: string, content: string) => {
        setFileSystem(prev => {
            const currentFiles = prev[path] || [];
            const updatedFiles = currentFiles.map(f =>
                f.id === fileId ? { ...f, textContent: content, size: `${new Blob([content]).size} B`, date: 'Just now' } : f
            );
            return {
                ...prev,
                [path]: updatedFiles
            };
        });
    }, []);

    const renameFile = useCallback((path: string, fileId: string, newName: string) => {
        setFileSystem(prev => {
            const currentFiles = prev[path] || [];
            const updatedFiles = currentFiles.map(f =>
                f.id === fileId ? { ...f, name: newName } : f
            );
            return {
                ...prev,
                [path]: updatedFiles
            };
        });
    }, []);

    const deleteFile = useCallback((path: string, fileId: string) => {
        setFileSystem(prev => {
            const currentFiles = prev[path] || [];
            const updatedFiles = currentFiles.filter(f => f.id !== fileId);
            return {
                ...prev,
                [path]: updatedFiles
            };
        });
    }, []);

    const getFile = useCallback((path: string, fileId: string) => {
        return fileSystem[path]?.find(f => f.id === fileId);
    }, [fileSystem]);

    const findFile = useCallback((fileId: string) => {
        for (const [path, files] of Object.entries(fileSystem)) {
            const file = files.find(f => f.id === fileId);
            if (file) return { file, path };
        }
        return undefined;
    }, [fileSystem]);

    return (
        <FileSystemContext.Provider value={{ fileSystem, createFile, updateFileContent, renameFile, deleteFile, getFile, findFile }}>
            {children}
        </FileSystemContext.Provider>
    );
};

export const useFileSystem = () => {
    const context = useContext(FileSystemContext);
    if (context === undefined) {
        throw new Error('useFileSystem must be used within a FileSystemProvider');
    }
    return context;
};
