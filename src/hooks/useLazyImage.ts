import { useState, useEffect, useRef } from 'react';

/**
 * Hook for lazy loading images using Intersection Observer
 * Returns loading state and ref to attach to image container
 */
export function useLazyImage(options?: IntersectionObserverInit) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const element = imgRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: '50px', // Start loading 50px before image enters viewport
                threshold: 0.01,
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return { imgRef, isInView, isLoaded, setIsLoaded };
}

