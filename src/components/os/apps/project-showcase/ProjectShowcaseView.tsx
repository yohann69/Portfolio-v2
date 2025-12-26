"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { useWindowManager } from '../../WindowManager';
import { PROJECTS } from './data';
import { LavaBackground } from './LavaBackground';
import { usePointerCssVars } from './usePointerCssVars';
import { ProjectSidebar } from './ProjectSidebar';
import { ProjectHero } from './ProjectHero';
import { TechStackPanels } from './TechStackPanels';
import { ScreenshotsGrid } from './ScreenshotsGrid';
import { ProjectStory } from './ProjectStory';
import { ProjectQuote } from './ProjectQuote';
import { FooterNav } from './FooterNav';

export function ProjectShowcaseView({ projectId: propProjectId }: { projectId?: string }) {
    const { windows } = useWindowManager();
    const windowData = windows['project-showcase']?.data;
    const projectId = windowData?.projectId || propProjectId;

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { onMouseMove, onMouseLeave } = usePointerCssVars(rootRef);

    useEffect(() => {
        if (!projectId) return;
        const index = PROJECTS.findIndex(p => p.id === projectId);
        if (index !== -1) setSelectedIndex(index);
    }, [projectId]);

    const handleSelect = (index: number) => {
        if (index === selectedIndex) return;
        setIsAnimating(true);
        setTimeout(() => {
            setSelectedIndex(index);
            containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setIsAnimating(false), 300);
        }, 150);
    };

    const project = PROJECTS[selectedIndex];

    const cssVars = useMemo(
        () => ({
            ['--mx' as any]: '0',
            ['--my' as any]: '0',
            ['--p1' as any]: project.colors.primary,
            ['--p2' as any]: project.colors.secondary,
            ['--p3' as any]: project.colors.accent ?? project.colors.secondary,
        }),
        [project.colors.accent, project.colors.primary, project.colors.secondary]
    );

    return (
        <div
            ref={rootRef}
            className="relative flex h-full w-full text-white overflow-hidden"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={cssVars}
        >
            <LavaBackground colors={project.colors} />

            <ProjectSidebar
                projects={PROJECTS}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                accentColor={project.colors.secondary}
            />

            <div
                ref={containerRef}
                className={cn(
                    'relative z-10 flex-1 overflow-y-auto transition-opacity duration-300',
                    isAnimating ? 'opacity-0' : 'opacity-100'
                )}
            >
                <ProjectHero project={project} />
                <TechStackPanels project={project} />
                <ProjectStory project={project} />
                <ScreenshotsGrid project={project} />
                <ProjectQuote project={project} />
                <FooterNav
                    projects={PROJECTS}
                    selectedIndex={selectedIndex}
                    onSelect={handleSelect}
                    project={project}
                />
            </div>
        </div>
    );
}
