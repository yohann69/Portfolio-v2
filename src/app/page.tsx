"use client";

import React, {useState} from "react";
import NavBar from "@/pages/NavBar";
import Hero from "@/pages/Hero";
import MultiTabs from "@/pages/MultiTabs";
import WobbleCardDemo from "@/pages/WobbleCard";
import Timeline from "@/pages/Timeline";
import ParallaxImages from "@/pages/HeroParralax";
import LangagesOutils from "@/pages/LangagesOutils";
import Image from "next/image";

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

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white" id="projects"
                style={{margin: '100px 100px -80px 100px'}}>
                Projets
            </h1>
            <MultiTabs/>

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="langages-outils"
                style={{marginTop: '200px'}}>
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

            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20" id="contact" style={{
                marginBottom: '-200px',
                marginTop: '100px'

            }}>
                Contact
            </h1>
            <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">

                <div id="profile"
                     className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">


                    <div className="p-4 md:p-12 text-center lg:text-left">
                        <div
                            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                        ></div>

                        <h1 className="text-3xl font-bold pt-8 lg:pt-0 text-black">Yohann CHAVANEL</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-orange-500 opacity-25"></div>
                        <p className="pt-4 text-black font-bold flex items-center justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-orange-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/>
                            </svg>
                            Alternant Développeur à Ardèche Drome Numérique
                        </p>
                        <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-orange-700 pr-4" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20">
                                <path
                                    d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"/>
                            </svg>
                            Valence, Lyon, Nantes
                        </p>
                        <p className="pt-8 font-semibold text-black">Accepté en formation d&apos;ingénieur informatique à l&apos;école
                            IMT Atlantique (Nantes), j&apos;ai le plaisir d&apos;intégrer le groupe La Poste en tant que développeur full stack en alternance à partir de septembre 2024.
                        </p>

                        <div className="pt-12 pb-8">
                            <a href="mailto:yohann.chavanel@proton.me" target={"_blank"}>
                                <button
                                    className="bg-orange-300 hover:bg-orange-500 text-black font-bold py-2 px-4 rounded-full">
                                    Me contacter
                                </button>
                            </a>
                            <a href="/CV_2024_Yohann_CHAVANEL.pdf" target={"_blank"}>
                                <button
                                    className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full ml-5">
                                    CV
                                </button>
                            </a>
                        </div>

                        <div
                            className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">

                            <a className="link" href="https://www.linkedin.com/in/yohann-chavanel/">
                                <Image
                                    src="/icons/linkedin.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </a>
                            <a className="link" href="https://github.com/yohann69">
                                <Image
                                    src="/icons/github.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </a>
                            <a className="link" href="https://www.instagram.com/_yohann_69/">
                                <Image
                                    src="/icons/instagram.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </a>
                            <a className="link" href="https://t.me/yohann69/">
                                <Image
                                    src="/icons/telegram.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </a>
                            <a className="link" href="https://wa.me/+33678139913/">
                                <Image
                                    src="/icons/whatsapp.png"
                                    alt="Instagram"
                                    width={24}
                                    height={24}
                                />
                            </a>

                        </div>


                    </div>

                </div>

                <div className="w-full lg:w-2/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/mevertical.png"
                         className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
                         alt="Yohann CHAVANEL"/>

                </div>
            </div>


        </div>
    );
}

