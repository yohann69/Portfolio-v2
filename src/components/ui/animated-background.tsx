"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export const AnimatedBackground = ({
    className,
}: {
    className?: string;
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={cn("absolute inset-0 overflow-hidden bg-slate-900", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black opacity-80" />

            {/* Warm tones: Blue, Yellow, Orange, Red, Purple */}

            {/* Blue/Purple Orb */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/30 blur-[100px] animate-blob mix-blend-screen" />

            {/* Purple/Pink Orb */}
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/30 blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />

            {/* Orange/Red Orb */}
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-orange-600/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />

            {/* Yellow/Amber Orb */}
            <div className="absolute bottom-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-yellow-600/20 blur-[80px] animate-blob animation-delay-6000 mix-blend-screen" />

            {/* Red/Pink Orb */}
            <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-red-600/20 blur-[90px] animate-blob animation-delay-8000 mix-blend-screen" />

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
        </div>
    );
};
