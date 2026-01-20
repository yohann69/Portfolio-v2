"use client";

import Image, { ImageProps } from "next/image";

type OptimizedImageProps = ImageProps & {
    /**
     * Use high priority only for above-the-fold images.
     * Defaults to lazy + low fetch priority.
     */
    priority?: boolean;
};

/**
 * Small wrapper around next/image to enforce conservative defaults:
 * - lazy loading for non-critical media
 * - low fetch priority for gallery assets
 * - capped quality to help keep files small (aiming <100kb per image)
 */
export function OptimizedImage(props: OptimizedImageProps) {
    const {
        priority = false,
        loading,
        fetchPriority,
        quality,
        sizes,
        ...rest
    } = props;

    const finalLoading = loading ?? (priority ? "eager" : "lazy");
    const finalFetchPriority = fetchPriority ?? (priority ? "high" : "low");

    return (
        <Image
            {...rest}
            priority={priority}
            loading={finalLoading}
            fetchPriority={finalFetchPriority}
            quality={quality ?? 60}
            sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 50vw"}
        />
    );
}
