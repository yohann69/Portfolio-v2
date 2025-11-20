"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { BgPreset } from "@/context/SettingsContext";

export const AnimatedBackground = ({
    className,
    preset,
    theme
}: {
    className?: string;
    preset?: BgPreset;
    theme?: 'light' | 'dark' | 'system';
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const colors = preset?.colors || {
        blob1: 'bg-blue-600/30',
        blob2: 'bg-purple-600/30',
        blob3: 'bg-orange-600/30',
        blob4: 'bg-yellow-600/20',
        blob5: 'bg-red-600/20'
    };

    // Determine if we should use light base
    const isLight = theme === 'light' || (theme === 'system' && typeof window !== 'undefined' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
    const blendMode = isLight ? "mix-blend-normal" : "mix-blend-screen";

    return (
        <div className={cn("absolute inset-0 overflow-hidden transition-colors duration-500", isLight ? "bg-gray-100" : "bg-slate-900", className)}>
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80 transition-colors duration-500", isLight ? "from-gray-100 via-gray-200 to-white" : "from-slate-900 via-slate-800 to-black")} />

            {/* Warm tones: Blue, Yellow, Orange, Red, Purple */}

            {/* Blue/Purple Orb */}
            <div className={cn("absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-blob transition-colors duration-500", blendMode, colors.blob1)} />

            {/* Purple/Pink Orb */}
            <div className={cn("absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] animate-blob animation-delay-2000 transition-colors duration-500", blendMode, colors.blob2)} />

            {/* Orange/Red Orb */}
            <div className={cn("absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full blur-[100px] animate-blob animation-delay-4000 transition-colors duration-500", blendMode, colors.blob3)} />

            {/* Yellow/Amber Orb */}
            <div className={cn("absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full blur-[80px] animate-blob animation-delay-6000 transition-colors duration-500", blendMode, colors.blob4)} />

            {/* Red/Pink Orb */}
            <div className={cn("absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full blur-[90px] animate-blob animation-delay-8000 transition-colors duration-500", blendMode, colors.blob5)} />

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
