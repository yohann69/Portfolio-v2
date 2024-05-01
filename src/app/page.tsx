"use client";

import React, {useState} from "react";
import NavBar from "@/pages/NavBar";
import Hero from "@/pages/Hero";
import MultiTabs from "@/pages/MultiTabs";
import WobbleCardDemo from "@/pages/WobbleCard";
import Timeline from "@/pages/Timeline";
import ParallaxImages from "@/pages/HeroParralax";
import LangagesOutils from "@/pages/LangagesOutils";

export default function Home() {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({x: event.clientX, y: event.clientY});
    };

    const radialGradient = `radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px,rgb(255 106 61 / 20%), rgb(0 0 0))`;


    return (
        <div
            className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
            style={{
                width: '100vw',
                // height: '100vh',
                background: radialGradient,
            }}
            onMouseMove={handleMouseMove}
        >
            <NavBar/>

            <Hero/>

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white" id="projects" style={{margin: '100px 100px -80px 100px'}}>
                Projets
            </h1>
            <MultiTabs/>

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="langages-outils" style={{marginTop: '200px'}}>
                Langages & Outils informatiques
            </h1>
            <LangagesOutils/>


            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="timeline">
                Ma timeline
            </h1>
            <Timeline/>

            <div id="photos"/>
            <ParallaxImages/>

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="contributions">
                Contributions
            </h1>
            <WobbleCardDemo/>

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="contact">
                Contact
            </h1>



        </div>
    );
}

