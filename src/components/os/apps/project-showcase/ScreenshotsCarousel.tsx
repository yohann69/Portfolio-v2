import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/utils/cn';

export function ScreenshotsCarousel({ project }: { project: ProjectData }) {
    const { t } = useSettings();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(0);
    }, [project.id]);

    const total = project.screenshots.length;
    const aspectClass = project.screenshotsAspect === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';

    const src = project.screenshots[index];

    const overlayGradient = useMemo(() => {
        return `linear-gradient(135deg, ${project.colors.primary}55, ${project.colors.secondary}35, ${(project.colors.accent ?? project.colors.secondary)}30)`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    const prev = () => setIndex((v) => (v - 1 + total) % total);
    const next = () => setIndex((v) => (v + 1) % total);

    return (
        <div className="px-8 pb-10">
            <GlassPanel className="p-8 overflow-hidden">
                <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold">{t('showcase.screenshots')}</h2>
                        <p className="text-sm text-white/60 mt-1">{t('showcase.screenshotsHint')}</p>
                    </div>

                    {total > 1 ? (
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={prev}
                                className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={next}
                                className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    ) : null}
                </div>

                <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: overlayGradient }} />

                        <div className={cn('relative', aspectClass)}>
                            {/* Clickable preview */}
                            <a
                                href={src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10"
                                aria-label={t('showcase.preview')}
                            />

                            <Image
                                src={src}
                                alt={`${project.name} screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 900px"
                                onError={(e) => {
                                    (e.currentTarget as any).style.display = 'none';
                                }}
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-xs text-white/40">{t('showcase.preview')}</div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-4">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm text-white/90">
                                    {t('showcase.preview')}
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails / list */}
                    <div className="lg:pl-1">
                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
                            {project.screenshots.map((s, i) => (
                                <button
                                    key={s}
                                    onClick={() => setIndex(i)}
                                    className={cn(
                                        'relative overflow-hidden rounded-xl border bg-black/20 transition',
                                        i === index
                                            ? 'border-white/20 ring-1 ring-white/15'
                                            : 'border-white/10 hover:border-white/15'
                                    )}
                                >
                                    <div className={cn('relative', project.screenshotsAspect === 'landscape' ? 'aspect-[16/10]' : 'aspect-[3/4]')}>
                                        <Image
                                            src={s}
                                            alt={`${project.name} thumbnail ${i + 1}`}
                                            fill
                                            className="object-cover opacity-90"
                                            sizes="220px"
                                            onError={(e) => {
                                                (e.currentTarget as any).style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute inset-0 grid place-items-center text-[10px] text-white/40">
                                            {i + 1}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {total > 1 ? (
                            <div className="mt-4 flex items-center justify-between gap-4">
                                <div className="text-xs text-white/60">
                                    {index + 1} / {total}
                                </div>
                                <div className="flex sm:hidden items-center gap-2">
                                    <button
                                        onClick={prev}
                                        className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </GlassPanel>
        </div>
    );
}
