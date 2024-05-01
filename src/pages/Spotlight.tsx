import React, {useState} from "react";
import {Spotlight} from "@/components/ui/spotlight";
import {Typewriter} from "@/pages/TipeWriter";
import Image from "next/image";

export function HeroSpotlight() {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({x: 0, y: 0});

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        setMousePosition({x: event.clientX, y: event.clientY});
    };

    const radialGradient = `radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px,rgb(255 255 255 / 10%), rgb(0 0 0))`;

    return (
        <div
            className="h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">

            <div
                className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden"
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: radialGradient,
                }}
                onMouseMove={handleMouseMove}
            >

                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                    <div className="flex justify-center p-20">
                        <Image
                            width={300}
                            height={300}
                            src="/img/1672410776042.jpg"
                            alt="CSS"
                            style={{borderRadius: '50%', objectFit: 'cover'}}
                        />
                    </div>
                    <p className="text-2xl md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Bonjour,
                        je suis</p>
                    <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Yohann CHAVANEL
                    </h1>

                    <Typewriter/>

                </div>
            </div>
        </div>
    );
}
