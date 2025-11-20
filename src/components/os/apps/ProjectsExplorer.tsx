"use client";

import React, { useState, useMemo } from 'react';
import {
    Folder,
    FileCode,
    ChevronRight,
    HardDrive,
    LayoutGrid,
    List as ListIcon,
    Search,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    Home,
    Download,
    Monitor,
    AppWindow,
    Gamepad2,
    ExternalLink,
    FileText,
    Video,
    Image as ImageIcon,
    Globe,
    Chrome,
    Play
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useWindowManager } from '../WindowManager';

type FileType = 'folder' | 'project' | 'contribution' | 'app' | 'pdf' | 'video' | 'image';

interface FileItem {
    id: string;
    name: string;
    type: FileType;
    description?: string;
    content?: React.ReactNode;
    tags?: string[];
    link?: string;
    image?: string;
    appId?: string; // For launching apps
    size?: string;
    date?: string;
    icon?: React.ElementType;
    url?: string; // For media files or browser
}

const fileSystem: Record<string, FileItem[]> = {
    '/': [
        { id: 'home', name: 'Home', type: 'folder', date: 'Today' },
        { id: 'desktop', name: 'Desktop', type: 'folder', date: 'Today' },
        { id: 'documents', name: 'Documents', type: 'folder', date: 'Today' },
        { id: 'downloads', name: 'Downloads', type: 'folder', date: 'Yesterday' },
        { id: 'applications', name: 'Applications', type: 'folder', date: '2024-01-01' },
        { id: 'gallery', name: 'Gallery', type: 'folder', date: '2024-01-01' },
    ],
    '/home': [
        { id: 'contributions', name: 'Contributions', type: 'folder', date: 'Last week' },
    ],
    '/desktop': [],
    '/documents': [
        { id: 'cv', name: 'CV_Yohann_CHAVANEL.pdf', type: 'pdf', size: '2.4 MB', date: '2024-03-15', url: '/CV_2024_Yohann_CHAVANEL.pdf' }
    ],
    '/downloads': [
        { id: 'rick', name: 'secret_video.mp4', type: 'video', size: '15 MB', date: '2024-04-01', url: '/rr.mp4' }
    ],
    '/applications': [
        { id: 'projects', name: 'Projects', type: 'folder', date: 'Today' },
        { id: 'snake-app', name: 'Snake Game', type: 'app', appId: 'snake', icon: Gamepad2, description: 'Classic Snake Game', size: '1.2 MB', date: '2024-01-01' },
        { id: 'browser-app', name: 'Web Browser', type: 'app', appId: 'browser', icon: Globe, description: 'Internet Explorer... but faster', size: '50 MB', date: '2024-01-01' },
        { id: 'pdf-app', name: 'PDF Viewer', type: 'app', appId: 'pdf-viewer', icon: FileText, description: 'View PDF documents', size: '10 MB', date: '2024-01-01' },
        { id: 'video-app', name: 'Video Player', type: 'app', appId: 'video-player', icon: Play, description: 'Play video files', size: '20 MB', date: '2024-01-01' },
    ],
    '/gallery': [
        { id: 'img1', name: 'Mountain.jpg', type: 'image', size: '2.1 MB', date: '2023-12-01', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop' },
        { id: 'img2', name: 'Code.png', type: 'image', size: '1.5 MB', date: '2023-12-05', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
        { id: 'img3', name: 'Setup.jpg', type: 'image', size: '3.2 MB', date: '2023-12-10', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
    ],
    '/applications/projects': [
        {
            id: 'adn',
            name: 'Eligibilite_ADN',
            type: 'app',
            appId: 'browser',
            icon: Globe,
            tags: ['Golang', 'SolidJS', 'PostGIS'],
            description: "Outil d'éligibilité à la fibre optique pour l'Ardèche et la Drôme.",
            url: "https://ardechedromenumerique.fr/eligibilite",
            image: "/adnlogo-300x262.png",
            content: "Application web permettant aux habitants de vérifier leur éligibilité à la fibre. Carte interactive, backend Go, frontend SolidJS.",
            size: '15 MB',
            date: '2023-11-20'
        },
        {
            id: 'voyo',
            name: 'VOYO_App',
            type: 'app',
            appId: 'browser',
            icon: Globe,
            tags: ['React Native', 'Golang', 'Firebase', 'PostgreSQL'],
            description: "Application mobile de mise en relation pour visites immobilières.",
            image: "/banner-voyo-full-wws.png",
            content: "Projet scolaire de groupe. App mobile Android/iOS. Backend Go, Chat Firebase, Base de données PostgreSQL avec PostGIS.",
            size: '45 MB',
            date: '2023-06-15'
        },
        {
            id: 'ade',
            name: 'ADE_Calendar',
            type: 'app',
            appId: 'browser',
            icon: Globe,
            tags: ['JavaScript', 'Golang', 'API'],
            description: "Interface responsive pour les emplois du temps de l'IUT.",
            url: "https://ade.pages.dev",
            image: "/calendaricon.png",
            content: "Site web palliant au manque d'interface responsive. API Golang pour parser l'ICS en JSON.",
            size: '2 MB',
            date: '2023-09-01'
        }
    ],
    '/home/contributions': [
        {
            id: 'xiaomi',
            name: 'Xiaomi_Community',
            type: 'contribution',
            tags: ['Community Management', 'Moderation'],
            description: "Modérateur de la communauté Xiaomi France.",
            image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
            content: "Animation de communauté, organisation d'événements, support utilisateurs. Membre de l'équipe photographie Xiaomi Global.",
            date: 'Ongoing'
        },
        {
            id: 'translation',
            name: 'OpenSource_Translation',
            type: 'contribution',
            tags: ['Translation', 'Proton', '2FAS'],
            description: "Traduction de projets open source (Proton, 2FAS).",
            content: "Contribution bénévole à la traduction française de services utilisés quotidiennement.",
            date: 'Ongoing'
        },
        {
            id: 'iot',
            name: 'IoT_Beta_Testing',
            type: 'contribution',
            tags: ['QA', 'IoT', 'Xiaomi Home'],
            description: "Tests de produits IoT et application Xiaomi Home.",
            image: "/mijalogo.png",
            content: "Test de versions beta, rapport de bugs, suggestions d'amélioration pour l'écosystème Xiaomi Home.",
            date: 'Ongoing'
        }
    ]
};

export default function ProjectsExplorer() {
    const [currentPath, setCurrentPath] = useState<string>('/home');
    const [history, setHistory] = useState<string[]>(['/home']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const { openWindow } = useWindowManager();

    const navigate = (path: string) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
        setSelectedFile(null);
        setSearchQuery('');
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelectedFile(null);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
            setSelectedFile(null);
        }
    };

    const goUp = () => {
        if (currentPath === '/') return;
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
        navigate(parentPath);
    };

    const handleItemClick = (item: FileItem) => {
        if (item.type === 'folder') {
            const newPath = currentPath === '/' ? `/${item.id}` : `${currentPath}/${item.id}`;
            navigate(newPath);
        } else if (item.type === 'app' && item.appId) {
            openWindow(item.appId as any, { url: item.url });
        } else if (item.type === 'pdf') {
            openWindow('pdf-viewer', { file: item.url, title: item.name });
        } else if (item.type === 'video') {
            openWindow('video-player', { src: item.url, title: item.name });
        } else if (item.type === 'image') {
            // For now, just select it to show preview in details pane
            // Or open gallery if we had a specific image viewer mode in gallery
            setSelectedFile(item);
        } else {
            setSelectedFile(item);
        }
    };

    const getAllFiles = (path: string = '/'): FileItem[] => {
        let files: FileItem[] = [];
        const items = fileSystem[path] || [];

        items.forEach(item => {
            files.push(item);
            if (item.type === 'folder') {
                const subPath = path === '/' ? `/${item.id}` : `${path}/${item.id}`;
                files = [...files, ...getAllFiles(subPath)];
            }
        });

        return files;
    };

    const currentItems = useMemo(() => {
        if (searchQuery) {
            const allFiles = getAllFiles();
            return allFiles.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return fileSystem[currentPath] || [];
    }, [currentPath, searchQuery]);

    return (
        <div className="flex flex-col h-full bg-[#202020] text-gray-100 font-sans select-none">
            {/* Toolbar */}
            <div className="h-12 bg-[#2c2c2c] border-b border-[#1a1a1a] flex items-center px-4 gap-4">
                <div className="flex items-center gap-1">
                    <button onClick={goBack} disabled={historyIndex === 0} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={goUp} disabled={currentPath === '/'} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 bg-[#202020] border border-[#3e3e3e] rounded flex items-center px-3 py-1.5 text-sm gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <div className="flex items-center gap-1 text-gray-300">
                        {searchQuery ? (
                            <span>Search Results</span>
                        ) : (
                            currentPath.split('/').map((part, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <ChevronRight className="w-3 h-3 text-gray-500" />}
                                    <span
                                        className="hover:bg-white/10 px-1 rounded cursor-pointer"
                                        onClick={() => {
                                            const newPath = currentPath.split('/').slice(0, i + 1).join('/') || '/';
                                            navigate(newPath);
                                        }}
                                    >
                                        {part || 'This PC'}
                                    </span>
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-[#202020] border border-[#3e3e3e] rounded flex items-center px-3 py-1.5 w-48">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Sub-toolbar */}
            <div className="h-10 bg-[#202020] border-b border-[#1a1a1a] flex items-center px-4 gap-2 text-sm">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/5 text-blue-400">
                    <div className="w-4 h-4 border-2 border-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold">+</div>
                    New
                </button>
                <div className="w-px h-4 bg-gray-600 mx-2" />
                <button
                    className={cn("p-1.5 rounded hover:bg-white/5", viewMode === 'grid' && "bg-white/10")}
                    onClick={() => setViewMode('grid')}
                >
                    <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                    className={cn("p-1.5 rounded hover:bg-white/5", viewMode === 'list' && "bg-white/10")}
                    onClick={() => setViewMode('list')}
                >
                    <ListIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#202020] border-r border-[#1a1a1a] flex flex-col py-2 overflow-y-auto">
                    <div className="px-2 mb-2">
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/home')}>
                            <Home className="w-4 h-4 text-blue-400" />
                            <span>Home</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/desktop')}>
                            <Monitor className="w-4 h-4 text-purple-400" />
                            <span>Desktop</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/documents')}>
                            <Folder className="w-4 h-4 text-yellow-400" />
                            <span>Documents</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/downloads')}>
                            <Download className="w-4 h-4 text-green-400" />
                            <span>Downloads</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/applications')}>
                            <AppWindow className="w-4 h-4 text-red-400" />
                            <span>Applications</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer text-sm" onClick={() => navigate('/gallery')}>
                            <ImageIcon className="w-4 h-4 text-pink-400" />
                            <span>Gallery</span>
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-700 my-1" />
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Favorites</div>
                    {/* Add favorites here if needed */}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                    <div className="flex-1 p-4 overflow-y-auto" onClick={() => setSelectedFile(null)}>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded border border-transparent hover:bg-white/5 cursor-pointer transition-all group",
                                            selectedFile?.id === item.id ? "bg-blue-500/20 border-blue-500/50" : ""
                                        )}
                                    >
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            {item.type === 'folder' ? (
                                                <Folder className="w-14 h-14 text-yellow-400 fill-yellow-400/20" />
                                            ) : item.type === 'app' ? (
                                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                                                    {item.icon ? <item.icon className="w-8 h-8 text-white" /> : <Gamepad2 className="w-8 h-8 text-white" />}
                                                </div>
                                            ) : item.type === 'pdf' ? (
                                                <FileText className="w-12 h-12 text-red-400" />
                                            ) : item.type === 'video' ? (
                                                <Video className="w-12 h-12 text-purple-400" />
                                            ) : item.type === 'image' ? (
                                                item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded shadow-sm" />
                                                ) : (
                                                    <ImageIcon className="w-12 h-12 text-pink-400" />
                                                )
                                            ) : item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded shadow-sm" />
                                            ) : (
                                                <FileCode className="w-12 h-12 text-blue-400" />
                                            )}
                                        </div>
                                        <span className="text-xs text-center break-all line-clamp-2 group-hover:text-white text-gray-300">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 text-xs text-gray-500 border-b border-gray-700">
                                    <span>Name</span>
                                    <span>Date modified</span>
                                    <span>Type</span>
                                </div>
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
                                        className={cn(
                                            "grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 text-sm hover:bg-white/5 cursor-pointer items-center",
                                            selectedFile?.id === item.id ? "bg-blue-500/20" : ""
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.type === 'folder' ? (
                                                <Folder className="w-4 h-4 text-yellow-400" />
                                            ) : item.type === 'app' ? (
                                                <Gamepad2 className="w-4 h-4 text-green-400" />
                                            ) : item.type === 'pdf' ? (
                                                <FileText className="w-4 h-4 text-red-400" />
                                            ) : item.type === 'video' ? (
                                                <Video className="w-4 h-4 text-purple-400" />
                                            ) : item.type === 'image' ? (
                                                <ImageIcon className="w-4 h-4 text-pink-400" />
                                            ) : (
                                                <FileCode className="w-4 h-4 text-blue-400" />
                                            )}
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="text-gray-400 text-xs">{item.date}</span>
                                        <span className="text-gray-400 text-xs capitalize">{item.type}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Pane */}
                    {selectedFile && selectedFile.type !== 'folder' && (
                        <div className="w-72 bg-[#202020] border-l border-[#1a1a1a] p-4 flex flex-col overflow-y-auto">
                            <div className="w-full aspect-video bg-black/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-white/5">
                                {selectedFile.image ? (
                                    <img src={selectedFile.image} alt={selectedFile.name} className="w-full h-full object-contain" />
                                ) : selectedFile.type === 'pdf' ? (
                                    <FileText className="w-12 h-12 text-red-400" />
                                ) : selectedFile.type === 'video' ? (
                                    <Video className="w-12 h-12 text-purple-400" />
                                ) : selectedFile.type === 'app' ? (
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                                        {selectedFile.icon ? <selectedFile.icon className="w-8 h-8 text-white" /> : <Gamepad2 className="w-8 h-8 text-white" />}
                                    </div>
                                ) : (
                                    <FileCode className="w-12 h-12 text-gray-600" />
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1 break-all">{selectedFile.name}</h3>
                            <div className="text-xs text-gray-500 mb-4">{selectedFile.type} • {selectedFile.size || 'Unknown size'}</div>

                            {selectedFile.tags && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedFile.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="text-sm text-gray-300 mb-6 leading-relaxed">
                                {selectedFile.content || selectedFile.description}
                            </div>

                            {selectedFile.link && (
                                <a
                                    href={selectedFile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open
                                </a>
                            )}

                            {(selectedFile.type === 'pdf' || selectedFile.type === 'video' || (selectedFile.type === 'app' && selectedFile.appId)) && (
                                <button
                                    onClick={() => handleItemClick(selectedFile)}
                                    className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Open
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
