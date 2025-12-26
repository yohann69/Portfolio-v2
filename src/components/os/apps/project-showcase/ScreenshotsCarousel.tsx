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
    const src = project.screenshots[index];

    const overlayGradient = useMemo(() => {
        return `linear-gradient(135deg, ${project.colors.primary}55, ${project.colors.secondary}35, ${(project.colors.accent ?? project.colors.secondary)}30)`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    const prev = () => setIndex((v) => (v - 1 + total) % total);
    const next = () => setIndex((v) => (v + 1) % total);

    if (total === 0) return null;

    return (
        <div className="px-8 pb-10">
            <GlassPanel className="p-8 overflow-hidden">
                <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold">{t('showcase.screenshots')}</h2>
                        <p className="text-sm text-white/60 mt-1">{t('showcase.screenshotsHint')}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-9 px-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center gap-2 text-sm transition"
                            aria-label={t('showcase.preview')}
                        >
                            {t('showcase.preview')}
                            <ExternalLink className="w-4 h-4" />
                        </a>

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
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <div className="absolute inset-0" style={{ background: overlayGradient }} />

                    {/* Fixed size carousel viewport (all slides share the same size) */}
                    <div className="relative aspect-video">
                        <div
                            className="absolute inset-0 flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${index * 100}%)` }}
                        >
                            {project.screenshots.map((s, i) => (
                                <div key={s} className="relative h-full w-full shrink-0">
                                    <Image
                                        src={s}
                                        alt={`${project.name} screenshot ${i + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 1024px) 100vw, 900px"
                                        onError={(e) => {
                                            (e.currentTarget as any).style.display = 'none';
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {total > 1 ? (
                    <div className="mt-4 flex items-center justify-between gap-4">
                        <div className="text-xs text-white/60">
                            {index + 1} / {total}
                        </div>

                        <div className="flex items-center gap-1.5">
                            {project.screenshots.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={cn(
                                        'h-1.5 w-6 rounded-full transition border',
                                        i === index
                                            ? 'bg-white/70 border-white/30'
                                            : 'bg-white/10 border-white/10 hover:bg-white/20'
                                    )}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
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
            </GlassPanel>
        </div>
    );
}
