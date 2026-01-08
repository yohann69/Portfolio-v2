"use client";

import React from "react";
import { Desktop } from "@/components/os/Desktop";
import MobileView from "@/components/MobileView";
import { useIsMobile } from "@/hooks/useIsMobile";
import { SettingsProvider } from "@/context/SettingsContext";

export default function Home() {
    const isMobile = useIsMobile();

    return (
        <main className="h-screen w-screen overflow-hidden">
            <SettingsProvider>
                {isMobile ? <MobileView /> : <Desktop />}
            </SettingsProvider>
        </main>
    );
}
