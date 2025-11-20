"use client";

import React from 'react';
import { Cpu, HardDrive, MemoryStick } from 'lucide-react';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-[#1e1e1e] text-white p-8 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-2xl">
                <span className="text-4xl font-bold">P</span>
            </div>

            <h1 className="text-2xl font-bold mb-2">PortfoliOS</h1>
            <p className="text-gray-400 mb-8">Version 2.0 (Aceternity)</p>

            <div className="grid grid-cols-3 gap-8 w-full max-w-md mb-8">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs text-gray-400">Next.js 14</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <MemoryStick className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-xs text-gray-400">React 18</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <HardDrive className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-xs text-gray-400">Tailwind</span>
                </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
                <p>© 2024 Yohann CHAVANEL. All rights reserved.</p>
                <p>Designed and built with ❤️</p>
            </div>
        </div>
    );
}
