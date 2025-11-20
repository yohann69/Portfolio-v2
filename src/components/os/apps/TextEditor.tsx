"use client";

import React, { useState, useEffect } from 'react';
import { useFileSystem } from '@/context/FileSystemContext';
import { useWindowManager } from '../WindowManager';
import { Save } from 'lucide-react';

export default function TextEditor() {
    const { windows } = useWindowManager();
    const { findFile, updateFileContent } = useFileSystem();
    const [content, setContent] = useState('');
    const [fileId, setFileId] = useState<string | null>(null);
    const [filePath, setFilePath] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    const windowData = windows['text-editor'].data;

    useEffect(() => {
        if (windowData && windowData.fileId) {
            const result = findFile(windowData.fileId);
            if (result) {
                setFileId(windowData.fileId);
                setFilePath(result.path);
                setContent(result.file.textContent || '');
                setIsDirty(false);
            }
        }
    }, [windowData, findFile]);

    const handleSave = () => {
        if (fileId && filePath) {
            updateFileContent(filePath, fileId, content);
            setIsDirty(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            handleSave();
        }
    };

    if (!fileId) {
        return (
            <div className="flex items-center justify-center h-full bg-white dark:bg-[#202020] text-gray-500">
                No file open
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#202020] text-gray-900 dark:text-gray-100 font-mono">
            <div className="h-10 bg-gray-100 dark:bg-[#2c2c2c] border-b border-gray-200 dark:border-[#1a1a1a] flex items-center px-4 gap-2">
                <button 
                    onClick={handleSave}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors ${
                        isDirty 
                            ? 'bg-blue-600 text-white hover:bg-blue-500' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                >
                    <Save className="w-4 h-4" />
                    Save
                </button>
                {isDirty && <span className="text-xs text-gray-500 italic">Unsaved changes</span>}
            </div>
            <textarea
                className="flex-1 w-full p-4 bg-transparent border-none outline-none resize-none"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                    setIsDirty(true);
                }}
                onKeyDown={handleKeyDown}
                spellCheck={false}
            />
        </div>
    );
}
