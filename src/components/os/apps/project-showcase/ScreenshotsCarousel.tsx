import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/utils/cn';

export function ScreenshotsCarousel({ project }: { project: ProjectData }) {
    const { t } = useSettings();
    const [index, setIndex] = useState(0);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

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

    const aspectClass = project.screenshotsAspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-video';

    const scrollToIndex = (i: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-slide]'));
        const slide = slides[i];
        slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    };

    const handlePrev = () => {
        const nextIndex = (index - 1 + total) % total;
        setIndex(nextIndex);
        scrollToIndex(nextIndex);
    };

    const handleNext = () => {
        const nextIndex = (index + 1) % total;
        setIndex(nextIndex);
        scrollToIndex(nextIndex);
    };

    const onScroll = () => {
        const el = scrollerRef.current;
        if (!el) return;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-slide]'));
            if (slides.length === 0) return;
            const current = el.scrollLeft;
            let bestIndex = 0;
            let bestDist = Number.POSITIVE_INFINITY;
            for (let i = 0; i < slides.length; i++) {
                const dist = Math.abs(slides[i].offsetLeft - current);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIndex = i;
                }
            }
            setIndex(bestIndex);
        });
    };

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
                                    onClick={handlePrev}
                                    className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
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

                    {/* Slider: show ~1.5 slides to hint horizontal scrolling */}
                    <div
                        ref={scrollerRef}
                        onScroll={onScroll}
                        className={cn(
                            'relative z-10 flex gap-4 overflow-x-auto scroll-smooth px-4 py-4',
                            'snap-x snap-mandatory',
                            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
                        )}
                    >
                        {project.screenshots.map((s, i) => (
                            <div
                                key={s}
                                data-slide
                                className={cn(
                                    'snap-start shrink-0 basis-2/3 sm:basis-2/3',
                                    'rounded-xl border bg-black/25 overflow-hidden',
                                    i === index ? 'border-white/20' : 'border-white/10'
                                )}
                            >
                                <div className={cn('relative w-full', aspectClass)}>
                                    <Image
                                        src={s}
                                        alt={`${project.name} screenshot ${i + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 640px) 70vw, 45vw"
                                        onError={(e) => {
                                            (e.currentTarget as any).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
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
                                onClick={handlePrev}
                                className="h-9 w-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 grid place-items-center transition"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
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
