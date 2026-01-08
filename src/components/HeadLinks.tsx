"use client";

import { useEffect } from 'react';

/**
 * Component to add preconnect and dns-prefetch links for external domains
 * This improves performance by establishing early connections to external resources
 */
export function HeadLinks() {
    useEffect(() => {
        // Add preconnect and dns-prefetch links for external image domains
        const links = [
            { rel: 'preconnect', href: 'https://i.imgur.com', crossOrigin: 'anonymous' },
            { rel: 'dns-prefetch', href: 'https://i.imgur.com' },
        ];

        links.forEach(({ rel, href, crossOrigin }) => {
            // Check if link already exists
            const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
            if (!existing) {
                const link = document.createElement('link');
                link.rel = rel;
                link.href = href;
                if (crossOrigin) {
                    link.crossOrigin = crossOrigin;
                }
                document.head.appendChild(link);
            }
        });

        // Cleanup function (optional, but good practice)
        return () => {
            // Links can stay in the head, no need to remove them
        };
    }, []);

    return null;
}

