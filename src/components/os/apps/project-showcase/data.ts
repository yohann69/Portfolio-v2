import type { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
    {
        id: 'transat',
        name: 'Transat',
        logoSrc: '/img/projects/transat/logo.png',
        taglineKey: 'project.transat.tagline',
        descriptionKey: 'project.transat.desc',
        story: {
            titleKey: 'project.transat.story.title',
            bodyKeys: ['project.transat.story.p1', 'project.transat.story.p2'],
        },
        screenshots: [
            '/img/projects/transat/01.png',
            '/img/projects/transat/02.png',
            '/img/projects/transat/03.png',
        ],
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
        year: '2025',
    },
    {
        id: 'destimt',
        name: 'Destimt',
        logoSrc: '/img/projects/destimt/logo.png',
        taglineKey: 'project.destimt.tagline',
        descriptionKey: 'project.destimt.desc',
        story: {
            titleKey: 'project.destimt.story.title',
            bodyKeys: ['project.destimt.story.p1', 'project.destimt.story.p2'],
        },
        screenshots: [
            '/img/projects/destimt/01.png',
            '/img/projects/destimt/02.png',
            '/img/projects/destimt/03.png',
        ],
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
        year: '2024',
    },
    {
        id: 'adn',
        name: 'Eligibilité ADN',
        logoSrc: '/img/projects/adn/logo.png',
        taglineKey: 'project.adn.tagline',
        descriptionKey: 'project.adn.desc2',
        story: {
            titleKey: 'project.adn.story.title2',
            bodyKeys: ['project.adn.story.p1', 'project.adn.story.p2'],
        },
        screenshots: [
            '/img/projects/adn/01.png',
            '/img/projects/adn/02.png',
            '/img/projects/adn/03.png',
        ],
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
        logoSrc: '/img/projects/voyo/logo.png',
        taglineKey: 'project.voyo.tagline',
        descriptionKey: 'project.voyo.desc2',
        story: {
            titleKey: 'project.voyo.story.title',
            bodyKeys: ['project.voyo.story.p1', 'project.voyo.story.p2'],
        },
        screenshots: [
            '/img/projects/voyo/01.png',
            '/img/projects/voyo/02.png',
            '/img/projects/voyo/03.png',
        ],
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
        logoSrc: '/img/projects/ade/logo.png',
        taglineKey: 'project.ade.tagline',
        descriptionKey: 'project.ade.desc2',
        story: {
            titleKey: 'project.ade.story.title2',
            bodyKeys: ['project.ade.story.p1', 'project.ade.story.p2'],
        },
        screenshots: [
            '/img/projects/ade/01.png',
            '/img/projects/ade/02.png',
            '/img/projects/ade/03.png',
        ],
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
        year: '2022',
    },
];
