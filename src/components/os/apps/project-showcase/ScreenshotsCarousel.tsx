import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';
import { useSettings } from '@/context/SettingsContext';
import { cn } from '@/utils/cn';

export function ScreenshotsCarousel({ project }: { project: ProjectData }) {
    const { t } = useSettings();
    const [index, setIndex] = useState(0);
    const [screenshots, setScreenshots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const [ratios, setRatios] = useState<Record<string, number>>({});

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setIsLoading(true);
            setIndex(0);

            try {
                const res = await fetch(`/api/project-images?projectId=${encodeURIComponent(project.id)}`);
                if (!res.ok) throw new Error('Failed to fetch project images');

                const data = (await res.json()) as { images?: unknown };
                const images = Array.isArray(data.images) ? (data.images.filter((x) => typeof x === 'string') as string[]) : [];

                if (!cancelled) {
                    setScreenshots(images);
                }
            } catch {
                if (!cancelled) {
                    setScreenshots([]);
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [project.id]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        screenshots.forEach((src) => {
            if (ratios[src]) return;
            const img = new window.Image();
            img.src = src;
            img.onload = () => {
                const w = img.naturalWidth || 1;
                const h = img.naturalHeight || 1;
                setRatios((prev) => ({ ...prev, [src]: w / h }));
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenshots]);

    const total = screenshots.length;
    const viewerTotal = screenshots.length;
    const viewerSrc = viewerIndex === null ? null : screenshots[viewerIndex];

    const overlayGradient = useMemo(() => {
        return `linear-gradient(135deg, ${project.colors.primary}55, ${project.colors.secondary}35, ${(project.colors.accent ?? project.colors.secondary)}30)`;
    }, [project.colors.accent, project.colors.primary, project.colors.secondary]);

    const openViewer = (i: number) => {
        setViewerIndex(i);
    };

    const closeViewer = () => {
        setViewerIndex(null);
    };

    const viewerPrev = useCallback(() => {
        setViewerIndex((prev) => {
            if (prev === null) return prev;
            return prev <= 0 ? prev : prev - 1;
        });
    }, []);

    const viewerNext = useCallback(() => {
        setViewerIndex((prev) => {
            if (prev === null) return prev;
            return prev >= viewerTotal - 1 ? prev : prev + 1;
        });
    }, [viewerTotal]);

    useEffect(() => {
        if (viewerIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeViewer();
            if (e.key === 'ArrowLeft') viewerPrev();
            if (e.key === 'ArrowRight') viewerNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [viewerIndex, viewerNext, viewerPrev]);

    if (isLoading || total === 0) return null;

    const scrollToIndex = (i: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        const slides = Array.from(el.querySelectorAll<HTMLElement>('[data-slide]'));
        const slide = slides[i];
        slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    };

    const handlePrev = () => {
        if (index <= 0) return;
        const nextIndex = index - 1;
        setIndex(nextIndex);
        scrollToIndex(nextIndex);
    };

    const handleNext = () => {
        if (index >= total - 1) return;
        const nextIndex = index + 1;
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
                        {total > 1 ? (
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={index === 0}
                                    className={cn(
                                        'h-9 w-9 rounded-full border border-white/10 grid place-items-center transition',
                                        index === 0 ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'
                                    )}
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={index === total - 1}
                                    className={cn(
                                        'h-9 w-9 rounded-full border border-white/10 grid place-items-center transition',
                                        index === total - 1
                                            ? 'bg-white/5 opacity-50 cursor-not-allowed'
                                            : 'bg-white/5 hover:bg-white/10'
                                    )}
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
                            'relative z-10 flex gap-4 overflow-x-auto scroll-smooth p-0',
                            'snap-x snap-mandatory',
                            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
                        )}
                    >
                        {screenshots.map((s, i) => (
                            <div
                                key={s}
                                data-slide
                                className={cn(
                                    'snap-start shrink-0',
                                    'rounded-xl border bg-black/25 overflow-hidden',
                                    i === index ? 'border-white/20' : 'border-white/10'
                                )}
                            >
                                <Image
                                    src={s}
                                    alt={`${project.name} screenshot ${i + 1}`}
                                    width={Math.max(1, Math.round((ratios[s] ?? 1) * 360))}
                                    height={360}
                                    className="block h-[260px] sm:h-[300px] md:h-[340px] w-auto max-w-none object-contain"
                                    sizes="(max-width: 640px) 80vw, 60vw"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => openViewer(i)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            openViewer(i);
                                        }
                                    }}
                                    onError={(e) => {
                                        (e.currentTarget as any).style.display = 'none';
                                    }}
                                />
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
                            {screenshots.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setIndex(i);
                                        scrollToIndex(i);
                                    }}
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
                                disabled={index === 0}
                                className={cn(
                                    'h-9 w-9 rounded-full border border-white/10 grid place-items-center transition',
                                    index === 0 ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10'
                                )}
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={index === total - 1}
                                className={cn(
                                    'h-9 w-9 rounded-full border border-white/10 grid place-items-center transition',
                                    index === total - 1
                                        ? 'bg-white/5 opacity-50 cursor-not-allowed'
                                        : 'bg-white/5 hover:bg-white/10'
                                )}
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : null}
            </GlassPanel>

            <AnimatePresence>
                {viewerIndex !== null && viewerSrc ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-black/95"
                        onClick={closeViewer}
                    >
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-[1001]"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeViewer();
                            }}
                            aria-label="Close"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <button
                            className={cn(
                                'absolute left-4 top-1/2 -translate-y-1/2 p-2 z-[1001] transition-colors',
                                viewerIndex === 0
                                    ? 'text-white/30 cursor-not-allowed'
                                    : 'text-white/60 hover:text-white'
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                viewerPrev();
                            }}
                            disabled={viewerIndex === 0}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-12 h-12" />
                        </button>

                        <button
                            className={cn(
                                'absolute right-4 top-1/2 -translate-y-1/2 p-2 z-[1001] transition-colors',
                                viewerIndex === viewerTotal - 1
                                    ? 'text-white/30 cursor-not-allowed'
                                    : 'text-white/60 hover:text-white'
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                viewerNext();
                            }}
                            disabled={viewerIndex === viewerTotal - 1}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-12 h-12" />
                        </button>

                        <div className="absolute inset-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <div className="relative w-full h-full">
                                <Image
                                    src={viewerSrc}
                                    alt={`${project.name} screenshot ${viewerIndex + 1}`}
                                    fill
                                    sizes="100vw"
                                    className="object-contain select-none"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm z-[1001]">
                            {viewerIndex + 1} / {viewerTotal}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
