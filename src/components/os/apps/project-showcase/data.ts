import type { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
    {
        id: 'transat',
        name: 'Transat',
        taglineKey: 'project.transat.tagline',
        descriptionKey: 'project.transat.desc',
        story: {
            titleKey: 'project.transat.story.title',
            bodyKeys: ['project.transat.story.p1', 'project.transat.story.p2'],
        },
        screenshots: ['/transat1.png', '/transat2.png', '/transat3.png'],
        screenshotsAspect: 'portrait',
        techStack: {
            frontend: ['React Native', 'Tailwind CSS'],
            backend: ['Golang', 'PostgreSQL'],
        },
        link: 'https://transat.dev/download',
        colors: {
            primary: '#EC7F32',
            secondary: '#0049A8',
            accent: '#FFE6CC',
        },
        quoteKey: 'project.transat.quote',
        year: '2024',
    },
    {
        id: 'destimt',
        name: 'Destimt',
        taglineKey: 'project.destimt.tagline',
        descriptionKey: 'project.destimt.desc',
        story: {
            titleKey: 'project.destimt.story.title',
            bodyKeys: ['project.destimt.story.p1', 'project.destimt.story.p2'],
        },
        screenshots: ['/destimt1.png', '/destimt2.png', '/destimt3.png'],
        screenshotsAspect: 'landscape',
        techStack: {
            frontend: ['React'],
            backend: ['Golang', 'MongoDB'],
        },
        link: 'https://destimt.fr',
        colors: {
            primary: '#9B59B6',
            secondary: '#8E44AD',
        },
        quoteKey: 'project.destimt.quote',
        year: '2023',
    },
    {
        id: 'adn',
        name: 'Eligibilité ADN',
        taglineKey: 'project.adn.tagline',
        descriptionKey: 'project.adn.desc2',
        story: {
            titleKey: 'project.adn.story.title2',
            bodyKeys: ['project.adn.story.p1', 'project.adn.story.p2'],
        },
        screenshots: ['/adn1.png', '/adn2.png', '/adn3.png'],
        screenshotsAspect: 'landscape',
        techStack: {
            frontend: ['SolidJS'],
            backend: ['Golang', 'PostgreSQL', 'PostGIS'],
        },
        link: 'https://ardechedromenumerique.fr/eligibilite',
        colors: {
            primary: '#3498DB',
            secondary: '#F1C40F',
        },
        quoteKey: 'project.adn.quote2',
        year: '2023',
    },
    {
        id: 'voyo',
        name: 'Voyo',
        taglineKey: 'project.voyo.tagline',
        descriptionKey: 'project.voyo.desc2',
        story: {
            titleKey: 'project.voyo.story.title',
            bodyKeys: ['project.voyo.story.p1', 'project.voyo.story.p2'],
        },
        screenshots: ['/voyo1.png', '/voyo2.png', '/voyo3.png'],
        screenshotsAspect: 'portrait',
        techStack: {
            frontend: ['React Native'],
            backend: ['Node.js', 'MongoDB'],
        },
        colors: {
            primary: '#E67E22',
            secondary: '#D35400',
            accent: '#F39C12',
        },
        quoteKey: 'project.voyo.quote',
        year: '2023',
    },
    {
        id: 'ade',
        name: 'ADE Calendar',
        taglineKey: 'project.ade.tagline',
        descriptionKey: 'project.ade.desc2',
        story: {
            titleKey: 'project.ade.story.title2',
            bodyKeys: ['project.ade.story.p1', 'project.ade.story.p2'],
        },
        screenshots: ['/ade1.png', '/ade2.png', '/ade3.png'],
        screenshotsAspect: 'landscape',
        techStack: {
            frontend: ['JavaScript', 'HTML', 'CSS'],
            backend: [],
        },
        link: 'https://ade.pages.dev',
        colors: {
            primary: '#3498DB',
            secondary: '#2C3E50',
            accent: '#5DADE2',
        },
        quoteKey: 'project.ade.quote2',
        year: '2023',
    },
];
