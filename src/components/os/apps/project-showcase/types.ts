import type { TranslationKey } from '@/utils/translations';

export type ScreenshotAspect = 'portrait' | 'landscape';

export interface TechStack {
    frontend: string[];
    backend: string[];
}

export interface ProjectColors {
    primary: string;
    secondary: string;
    accent?: string;
}

export interface ProjectStory {
    titleKey: TranslationKey;
    bodyKeys: TranslationKey[];
}

export interface ProjectData {
    id: string;
    name: string;
    logoSrc?: string;
    taglineKey: TranslationKey;
    descriptionKey: TranslationKey;
    story: ProjectStory;
    screenshots: string[];
    screenshotsAspect: ScreenshotAspect;
    techStack: TechStack;
    link?: string;
    colors: ProjectColors;
    quoteKey: TranslationKey;
    year: string;
}
