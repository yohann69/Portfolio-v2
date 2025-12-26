import React from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { GlassPanel } from './GlassPanel';
import type { ProjectData } from './types';

export function ScreenshotsGrid({ project }: { project: ProjectData }) {
    const aspectClass = project.screenshotsAspect === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';

    return (
        <div className="px-8 pb-10">
            <GlassPanel className="p-8 overflow-hidden">
                <div className="flex items-end justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold">Screenshots</h2>
                        <p className="text-sm text-white/60 mt-1">A quick look at the UI and interactions.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {project.screenshots.map((src, idx) => (
                        <div
                            key={src}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                            style={{ transform: 'translateZ(0)' }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: `linear-gradient(135deg, ${project.colors.primary}55, ${project.colors.secondary}35, ${(project.colors.accent ?? project.colors.secondary)}30)`,
                                }}
                            />

                            <div className={"relative " + aspectClass}>
                                <Image
                                    src={src}
                                    alt={`${project.name} screenshot ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    onError={(e) => {
                                        (e.currentTarget as any).style.display = 'none';
                                    }}
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-xs text-white/40">Screenshot {idx + 1}</div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-4">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm text-white/90">
                                        <Play className="w-4 h-4" />
                                        Preview
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </GlassPanel>
        </div>
    );
}
