"use client";

import React, {useState} from "react";
import {Sparkles} from "@/pages/Particules";
import {NavBar} from "@/pages/NavBar";
import {Cards} from "@/pages/Cards";
import {MultiTabs} from "@/pages/MultiTabs";
import {WobbleCardDemo} from "@/pages/WobbleCard";
import {Hero} from "@/pages/Hero";
import {ParallaxImages} from "@/pages/HeroParralax";
import {Timeline} from "@/pages/Timeline";

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
            {/*<WaveBackground/>*/}
            <Cards/>
            <Sparkles/>


            <MultiTabs/>

            <WobbleCardDemo/>

            <Timeline/>
            <ParallaxImages/>


            {/*<BackgroundGradientAnimation>*/}
            {/*    <div className="contactForm">*/}
            {/*        <div*/}
            {/*            className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">*/}
            {/*            <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">*/}
            {/*                Contact me*/}
            {/*            </p>*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="bg-green-500 bg-opacity-40 backdrop-blur-10 border border-green-500 border-opacity-20 h-300 w-100">*/}
            {/*            <label className="text-white">email</label>*/}
            {/*            <input type="text" placeholder="email@mail.com"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</BackgroundGradientAnimation>*/}
        </div>
    );
}

