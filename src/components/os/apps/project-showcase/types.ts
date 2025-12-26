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
    title: string;
    body: string[];
}

export interface ProjectData {
    id: string;
    name: string;
    tagline: string;
    description: string;
    story: ProjectStory;
    screenshots: string[];
    screenshotsAspect: ScreenshotAspect;
    techStack: TechStack;
    link?: string;
    colors: ProjectColors;
    quote: string;
    year: string;
}
