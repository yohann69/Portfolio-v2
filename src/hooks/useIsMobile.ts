"use client";

import { useState, useEffect } from 'react';

export function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            if (typeof window === 'undefined') return;
            
            // Check if it's a phone (not tablet)
            const userAgent = navigator.userAgent;
            const isPhone = /iPhone|iPod|Android.*Mobile|BlackBerry|Windows Phone/i.test(userAgent);
            
            // Also check screen width for phones (typically < 768px)
            const isSmallScreen = window.innerWidth < 768;
            
            // Exclude tablets (iPad, Android tablets)
            const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);
            
            setIsMobile(isPhone && isSmallScreen && !isTablet);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

