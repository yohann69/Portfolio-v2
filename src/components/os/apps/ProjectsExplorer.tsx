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
    Play,
    Trash2
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useWindowManager } from '../WindowManager';
import { useSettings } from '@/context/SettingsContext';
import { useFileSystem, FileItem } from '@/context/FileSystemContext';

export default function ProjectsExplorer() {
    const [currentPath, setCurrentPath] = useState<string>('/documents');
    const [history, setHistory] = useState<string[]>(['/documents']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const { openWindow } = useWindowManager();
    const { t } = useSettings();
    const { fileSystem, createFile, renameFile, deleteFile } = useFileSystem();

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
        setSelectedFile(item);
    };

    const handleItemDoubleClick = (item: FileItem) => {
        if (item.type === 'folder') {
            if (item.targetPath) {
                navigate(item.targetPath);
            } else {
                const newPath = currentPath === '/' ? `/${item.id}` : `${currentPath}/${item.id}`;
                navigate(newPath);
            }
        } else if (item.type === 'project' && item.appId) {
            openWindow(item.appId as any, { projectId: item.id });
        } else if (item.type === 'app' && item.appId) {
            openWindow(item.appId as any, { url: item.url });
        } else if (item.type === 'pdf') {
            openWindow('pdf-viewer', { file: item.url, title: item.translationKey ? t(item.translationKey as any) : item.name });
        } else if (item.type === 'video') {
            openWindow('video-player', { src: item.url, title: item.translationKey ? t(item.translationKey as any) : item.name });
        } else if (item.type === 'txt') {
            openWindow('text-editor', { fileId: item.id });
        } else if (item.type === 'image') {
            // For now, just select it to show preview in details pane
            // Or open gallery if we had a specific image viewer mode in gallery
            setSelectedFile(item);
        }
    };

    const handleNewFile = () => {
        const newFileId = `file-${Date.now()}`;
        const newFile: FileItem = {
            id: newFileId,
            name: 'New Text Document.txt',
            type: 'txt',
            date: 'Just now',
            size: '0 B',
            textContent: '',
        };
        createFile(currentPath, newFile);

        // Start renaming immediately
        setRenamingFileId(newFileId);
        setRenameValue('New Text Document.txt');
    };

    const handleRenameSubmit = () => {
        if (renamingFileId && renameValue.trim()) {
            renameFile(currentPath, renamingFileId, renameValue.trim());

            // Open the file after renaming if it's the one we just created
            // We can check if it's a text file and open it
            const file = fileSystem[currentPath]?.find(f => f.id === renamingFileId);
            if (file && file.type === 'txt') {
                openWindow('text-editor', { fileId: renamingFileId });
            }

            setRenamingFileId(null);
            setRenameValue('');
        } else {
            // If empty name, cancel rename or revert to original? 
            // For now, just cancel
            setRenamingFileId(null);
        }
    };

    const handleDeleteFile = () => {
        if (selectedFile && selectedFile.type === 'txt') {
            deleteFile(currentPath, selectedFile.id);
            setSelectedFile(null);
        }
    };

    const currentItems = useMemo(() => {
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

        if (searchQuery) {
            const allFiles = getAllFiles();
            return allFiles.filter(item =>
                (item.translationKey ? t(item.translationKey as any) : item.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.descriptionKey ? t(item.descriptionKey as any) : item.description)?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return fileSystem[currentPath] || [];
    }, [currentPath, searchQuery, t, fileSystem]);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 font-sans select-none transition-colors duration-200">
            {/* Toolbar */}
            <div className="h-12 bg-gray-100 dark:bg-[#2c2c2c] border-b border-gray-200 dark:border-[#1a1a1a] flex items-center px-4 gap-4 transition-colors duration-200">
                <div className="flex items-center gap-1">
                    <button onClick={goBack} disabled={historyIndex === 0} className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={goUp} disabled={currentPath === '/'} className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 bg-white dark:bg-[#202020] border border-gray-300 dark:border-[#3e3e3e] rounded flex items-center px-3 py-1.5 text-sm gap-2 transition-colors duration-200">
                    <Monitor className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        {searchQuery ? (
                            <span>{t('explorer.search')}</span>
                        ) : (
                            currentPath.split('/').map((part, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <ChevronRight className="w-3 h-3 text-gray-400 dark:text-gray-500" />}
                                    <span
                                        className="hover:bg-black/5 dark:hover:bg-white/10 px-1 rounded cursor-pointer"
                                        onClick={() => {
                                            const newPath = currentPath.split('/').slice(0, i + 1).join('/') || '/';
                                            navigate(newPath);
                                        }}
                                    >
                                        {part ? (
                                            part === 'home' ? t('explorer.home') :
                                                part === 'desktop' ? t('explorer.desktop') :
                                                    part === 'documents' ? t('explorer.documents') :
                                                        part === 'downloads' ? t('explorer.downloads') :
                                                            part === 'applications' ? t('explorer.applications') :
                                                                part === 'gallery' ? t('app.gallery') :
                                                                    part
                                        ) : t('explorer.thispc')}
                                    </span>
                                </React.Fragment>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-[#202020] border border-gray-300 dark:border-[#3e3e3e] rounded flex items-center px-3 py-1.5 w-48 transition-colors duration-200">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder={t('explorer.search')}
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Sub-toolbar */}
            <div className="h-10 bg-white dark:bg-[#202020] border-b border-gray-200 dark:border-[#1a1a1a] flex items-center px-4 gap-2 text-sm transition-colors duration-200">
                <button
                    onClick={handleNewFile}
                    className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-blue-500 dark:text-blue-400"
                >
                    <div className="w-4 h-4 border-2 border-blue-500 dark:border-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold">+</div>
                    {t('explorer.new')}
                </button>
                <button
                    onClick={handleDeleteFile}
                    disabled={!selectedFile || selectedFile.type !== 'txt'}
                    className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 text-red-500 dark:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Trash2 className="w-4 h-4" />
                    {t('explorer.delete')}
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-2" />
                <button
                    className={cn("p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5", viewMode === 'grid' && "bg-black/5 dark:bg-white/10")}
                    onClick={() => setViewMode('grid')}
                >
                    <LayoutGrid className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                    className={cn("p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5", viewMode === 'list' && "bg-black/5 dark:bg-white/10")}
                    onClick={() => setViewMode('list')}
                >
                    <ListIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-gray-50 dark:bg-[#202020] border-r border-gray-200 dark:border-[#1a1a1a] flex flex-col py-2 overflow-y-auto transition-colors duration-200">
                    <div className="px-2 mb-2">
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath === '/home' && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/home')}
                        >
                            <Home className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <span>{t('explorer.home')}</span>
                        </div>
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath === '/desktop' && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/desktop')}
                        >
                            <Monitor className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>{t('explorer.desktop')}</span>
                        </div>
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath.startsWith('/documents') && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/documents')}
                        >
                            <Folder className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                            <span>{t('explorer.documents')}</span>
                        </div>
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath === '/downloads' && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/downloads')}
                        >
                            <Download className="w-4 h-4 text-green-500 dark:text-green-400" />
                            <span>{t('explorer.downloads')}</span>
                        </div>
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath === '/applications' && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/applications')}
                        >
                            <AppWindow className="w-4 h-4 text-red-500 dark:text-red-400" />
                            <span>{t('explorer.applications')}</span>
                        </div>
                        <div
                            className={cn("flex items-center gap-2 px-2 py-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-sm text-gray-700 dark:text-gray-300", currentPath === '/gallery' && "bg-black/5 dark:bg-white/10 font-medium")}
                            onClick={() => navigate('/gallery')}
                        >
                            <ImageIcon className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                            <span>{t('app.gallery')}</span>
                        </div>
                    </div>
                    <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-1" />
                    <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">{t('explorer.favorites')}</div>
                    {/* Add favorites here if needed */}
                </div>

                {/* Main Content */}
                <div className="flex-1 flex bg-white dark:bg-[#202020] transition-colors duration-200">
                    <div className="flex-1 p-4 overflow-y-auto" onClick={() => setSelectedFile(null)}>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
                                        onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(item); }}
                                        className={cn(
                                            "flex flex-col items-center gap-2 p-2 rounded border border-transparent hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-all group",
                                            selectedFile?.id === item.id ? "bg-blue-500/10 dark:bg-blue-500/20 border-blue-500/30 dark:border-blue-500/50" : ""
                                        )}
                                    >
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            {item.type === 'folder' ? (
                                                <Folder className="w-14 h-14 text-yellow-500 dark:text-yellow-400 fill-yellow-500/20 dark:fill-yellow-400/20" />
                                            ) : item.type === 'project' ? (
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                                                    <Globe className="w-8 h-8 text-white" />
                                                </div>
                                            ) : item.type === 'app' ? (
                                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                                                    {item.icon ? <item.icon className="w-8 h-8 text-white" /> : <Gamepad2 className="w-8 h-8 text-white" />}
                                                </div>
                                            ) : item.type === 'pdf' ? (
                                                <FileText className="w-12 h-12 text-red-500 dark:text-red-400" />
                                            ) : item.type === 'video' ? (
                                                <Video className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                                            ) : item.type === 'txt' ? (
                                                <FileText className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                                            ) : item.type === 'image' ? (
                                                item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded shadow-sm" />
                                                ) : (
                                                    <ImageIcon className="w-12 h-12 text-pink-500 dark:text-pink-400" />
                                                )
                                            ) : item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded shadow-sm" />
                                            ) : (
                                                <FileCode className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                                            )}
                                        </div>
                                        {renamingFileId === item.id ? (
                                            <input
                                                type="text"
                                                value={renameValue}
                                                onChange={(e) => setRenameValue(e.target.value)}
                                                onBlur={handleRenameSubmit}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleRenameSubmit();
                                                }}
                                                autoFocus
                                                className="w-full text-xs text-center bg-white dark:bg-[#333] border border-blue-500 rounded px-1 outline-none text-black dark:text-white"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        ) : (
                                            <span className="text-xs text-center break-all line-clamp-2 text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">
                                                {item.translationKey ? t(item.translationKey as any) : item.name}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 text-xs text-gray-500 border-b border-gray-200 dark:border-gray-700">
                                    <span>{t('explorer.name')}</span>
                                    <span>{t('explorer.date')}</span>
                                    <span>{t('explorer.type')}</span>
                                </div>
                                {currentItems.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={(e) => { e.stopPropagation(); handleItemClick(item); }}
                                        onDoubleClick={(e) => { e.stopPropagation(); handleItemDoubleClick(item); }}
                                        className={cn(
                                            "grid grid-cols-[2fr_1fr_1fr] gap-4 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer items-center text-gray-700 dark:text-gray-300",
                                            selectedFile?.id === item.id ? "bg-blue-500/10 dark:bg-blue-500/20" : ""
                                        )}
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.type === 'folder' ? (
                                                <Folder className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                                            ) : item.type === 'project' ? (
                                                <Globe className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                            ) : item.type === 'app' ? (
                                                <Gamepad2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                                            ) : item.type === 'pdf' ? (
                                                <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
                                            ) : item.type === 'video' ? (
                                                <Video className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                                            ) : item.type === 'txt' ? (
                                                <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            ) : item.type === 'image' ? (
                                                <ImageIcon className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                                            ) : (
                                                <FileCode className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                            )}
                                            {renamingFileId === item.id ? (
                                                <input
                                                    type="text"
                                                    value={renameValue}
                                                    onChange={(e) => setRenameValue(e.target.value)}
                                                    onBlur={handleRenameSubmit}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleRenameSubmit();
                                                    }}
                                                    autoFocus
                                                    className="flex-1 bg-white dark:bg-[#333] border border-blue-500 rounded px-1 outline-none text-black dark:text-white h-6"
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            ) : (
                                                <span>{item.translationKey ? t(item.translationKey as any) : item.name}</span>
                                            )}
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400 text-xs">{item.date}</span>
                                        <span className="text-gray-500 dark:text-gray-400 text-xs capitalize">{item.type}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Pane */}
                    {selectedFile && selectedFile.type !== 'folder' && (
                        <div className="w-72 bg-gray-50 dark:bg-[#202020] border-l border-gray-200 dark:border-[#1a1a1a] p-4 flex flex-col overflow-y-auto transition-colors duration-200">
                            <div className="w-full aspect-video bg-black/5 dark:bg-black/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5">
                                {selectedFile.image ? (
                                    <img src={selectedFile.image} alt={selectedFile.name} className="w-full h-full object-contain" />
                                ) : selectedFile.type === 'pdf' ? (
                                    <FileText className="w-12 h-12 text-red-500 dark:text-red-400" />
                                ) : selectedFile.type === 'video' ? (
                                    <Video className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                                ) : selectedFile.type === 'txt' ? (
                                    <FileText className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                                ) : selectedFile.type === 'app' ? (
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                                        {selectedFile.icon ? <selectedFile.icon className="w-8 h-8 text-white" /> : <Gamepad2 className="w-8 h-8 text-white" />}
                                    </div>
                                ) : (
                                    <FileCode className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 break-all">
                                {selectedFile.translationKey ? t(selectedFile.translationKey as any) : selectedFile.name}
                            </h3>
                            <div className="text-xs text-gray-500 mb-4">{selectedFile.type} • {selectedFile.size || 'Unknown size'}</div>

                            {selectedFile.tags && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedFile.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded border border-blue-500/20">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {selectedFile.contentKey ? t(selectedFile.contentKey as any) :
                                    selectedFile.content ||
                                    selectedFile.textContent ||
                                    (selectedFile.descriptionKey ? t(selectedFile.descriptionKey as any) : selectedFile.description)}
                            </div>

                            {selectedFile.link && (
                                <a
                                    href={selectedFile.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {t('explorer.open')}
                                </a>
                            )}

                            {(selectedFile.type === 'project' || selectedFile.type === 'pdf' || selectedFile.type === 'video' || selectedFile.type === 'txt' || (selectedFile.type === 'app' && selectedFile.appId)) && (
                                <button
                                    onClick={() => handleItemDoubleClick(selectedFile)}
                                    className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium shadow-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    {t('explorer.open')}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


