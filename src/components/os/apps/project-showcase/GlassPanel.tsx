import React from 'react';
import { cn } from '@/utils/cn';

export function GlassPanel({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl',
                'shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]',
                className
            )}
        >
            {children}
        </div>
    );
}
