import type { ProjectData } from './types';

export const PROJECTS: ProjectData[] = [
    {
        id: 'transat',
        name: 'Transat',
        tagline: 'A mobile product built to feel premium.',
        description: 'React Native app with Tailwind-driven UI patterns, backed by a fast Golang API and PostgreSQL.',
        story: {
            title: 'Designed like a product, not a demo',
            body: [
                'Transat focuses on smooth navigation, crisp typography, and a UI that stays clean even when the data gets complex.',
                'On the backend, Golang and PostgreSQL keep responses snappy and predictable. The goal: a mobile experience that feels effortless.',
            ],
        },
        screenshots: ['/transat1.png', '/transat2.png', '/transat3.png'],
        screenshotsAspect: 'portrait',
        techStack: {
            frontend: ['React Native', 'Tailwind CSS'],
            backend: ['Golang', 'PostgreSQL'],
        },
        link: 'https://transat.dev/download',
        colors: {
            primary: '#FF6B35',
            secondary: '#4ECDC4',
            accent: '#FFE5B4',
        },
        quote: 'Orange/blue/creme palette with a travel-ready, premium vibe.',
        year: '2024',
    },
    {
        id: 'destimt',
        name: 'Destimt',
        tagline: 'Fast, clear, and made for decisions.',
        description: 'React front-end paired with a Golang backend and MongoDB — focused on speed and readability.',
        story: {
            title: 'Clarity-first UI, performance-first backend',
            body: [
                'Destimt is built around reducing friction: the UI prioritizes the next action and keeps information dense without being noisy.',
                'Golang handles the heavy lifting server-side, while MongoDB keeps iteration fast when features evolve.',
            ],
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
        quote: 'A bold monochrome purple look — clean, focused, confident.',
        year: '2023',
    },
    {
        id: 'adn',
        name: 'Eligibilité ADN',
        tagline: 'Eligibility, maps, and geodata at scale.',
        description: 'SolidJS frontend with a Golang backend, powered by PostgreSQL + PostGIS for geospatial queries.',
        story: {
            title: 'Built for real-world data + maps',
            body: [
                'Eligibility platforms live and die by trust: the UI has to be simple, while the underlying spatial logic must be correct and fast.',
                'PostGIS enables precise geospatial filtering; SolidJS keeps the frontend responsive even with map-heavy interactions.',
            ],
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
        quote: 'Blue/yellow contrast for data-heavy surfaces and maps.',
        year: '2023',
    },
    {
        id: 'voyo',
        name: 'Voyo',
        tagline: 'Warm UX, mobile-first by design.',
        description: 'React Native mobile app backed by Node.js and MongoDB, designed for real-world usage flows.',
        story: {
            title: 'A product that feels friendly',
            body: [
                'Voyo leans into warm tones and simple flows — the UI is designed to feel inviting and reduce cognitive load on mobile.',
                'Node.js + MongoDB provide flexibility for rapid iteration while keeping the experience responsive.',
            ],
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
        quote: 'Warm gradients, friendly interactions, and a clean mobile rhythm.',
        year: '2023',
    },
    {
        id: 'ade',
        name: 'ADE Calendar',
        tagline: 'Timetables that look great everywhere.',
        description: 'A lightweight responsive schedule viewer built with classic web tech and clean blue tones.',
        story: {
            title: 'Small stack, sharp execution',
            body: [
                'ADE Calendar focuses on accessibility and readability first, especially on mobile where most schedule tools fall apart.',
                'It’s deliberately lightweight: fast loads, clear layout, and minimal UI chrome.',
            ],
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
        quote: 'Blue tones, minimal UI, maximum readability.',
        year: '2023',
    },
];
