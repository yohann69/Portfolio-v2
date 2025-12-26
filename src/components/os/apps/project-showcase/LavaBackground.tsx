import React, { useMemo } from 'react';
import type { ProjectColors } from './types';

export function LavaBackground({ colors }: { colors: ProjectColors }) {
    const bg = useMemo(() => {
        const accent = colors.accent ?? colors.secondary;
        return `radial-gradient(1200px 600px at 15% 20%, ${colors.primary}55 0%, transparent 60%),
                radial-gradient(900px 550px at 85% 30%, ${colors.secondary}55 0%, transparent 55%),
                radial-gradient(900px 650px at 55% 85%, ${accent}45 0%, transparent 60%),
                radial-gradient(1200px 900px at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 55%),
                linear-gradient(180deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.80) 60%, rgba(0,0,0,0.94) 100%)`;
    }, [colors.accent, colors.primary, colors.secondary]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{ background: bg }} />

            <div
                className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-70 mix-blend-screen blur-3xl"
                style={{
                    background: 'radial-gradient(circle at 30% 30%, var(--p1) 0%, transparent 62%)',
                    transform: 'translate(calc(var(--mx) * 40px), calc(var(--my) * 40px))',
                    animation: 'lavaDriftA 10s ease-in-out infinite',
                }}
            />
            <div
                className="absolute top-10 -right-48 h-[620px] w-[620px] rounded-full opacity-70 mix-blend-screen blur-3xl"
                style={{
                    background: 'radial-gradient(circle at 40% 35%, var(--p2) 0%, transparent 60%)',
                    transform: 'translate(calc(var(--mx) * -52px), calc(var(--my) * 34px))',
                    animation: 'lavaDriftB 12s ease-in-out infinite',
                }}
            />
            <div
                className="absolute -bottom-52 left-1/3 h-[720px] w-[720px] rounded-full opacity-60 mix-blend-screen blur-3xl"
                style={{
                    background: 'radial-gradient(circle at 45% 45%, var(--p3) 0%, transparent 62%)',
                    transform: 'translate(calc(var(--mx) * 38px), calc(var(--my) * -52px))',
                    animation: 'lavaDriftC 14s ease-in-out infinite',
                }}
            />

            <div className="absolute inset-0 bg-black/35 backdrop-blur-3xl" />

            <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
                }}
            />

            <style jsx>{`
                @keyframes lavaDriftA {
                    0%, 100% { transform: translate(calc(var(--mx) * 40px), calc(var(--my) * 40px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * 40px), calc(var(--my) * 40px)) translate(36px, -20px) scale(1.06); }
                }
                @keyframes lavaDriftB {
                    0%, 100% { transform: translate(calc(var(--mx) * -52px), calc(var(--my) * 34px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * -52px), calc(var(--my) * 34px)) translate(-26px, 28px) scale(1.08); }
                }
                @keyframes lavaDriftC {
                    0%, 100% { transform: translate(calc(var(--mx) * 38px), calc(var(--my) * -52px)) translate(0px, 0px) scale(1); }
                    50% { transform: translate(calc(var(--mx) * 38px), calc(var(--my) * -52px)) translate(18px, 30px) scale(1.07); }
                }
            `}</style>
        </div>
    );
}
