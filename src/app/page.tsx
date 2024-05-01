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
            {/*<Cards/>*/}
            {/*<Sparkles/>*/}


            <MultiTabs/>

            <WobbleCardDemo/>

            <section id="competences">
                <h2>Compétences</h2>
                <p>Au cours de ma formation de BUT Informatique, de mon alternance au sein d'<a
                    href="https://ardechedromenumerique.fr/" target="_blank">Ardèche Drome Numérique</a> ou de mes
                    projets anexes, j'ai appris à manier et utiliser
                    les technologies suivantes</p>
                <br/>
                <div className="progLanguages">
                    <h3 className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Langages de programmation</h3>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/javascript" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
                        alt="JavaScript"/></a>
                    <a href="https://nodejs.org/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg"
                        alt="NodeJS"/></a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
                        alt="html"/></a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"
                        alt="CSS"/></a>
                    <a href="https://www.python.org/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
                        alt="Python"/></a>
                    <a href="https://www.php.net/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
                        alt="PHP"/></a>
                    <a href="https://www.java.com/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
                        alt="Java"/></a>
                    <a href="https://en.wikipedia.org/wiki/C_(programming_language)" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg"
                        alt="C"/></a>
                    <a href="https://www.mysql.com/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
                        alt="MYSQL"/></a>
                    <a href="https://www.postgresql.org/" target="_blank"><img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg"
                        alt="Postgresql"/></a>
                    <a href="https://www.mongodb.com/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
                        alt="MongoDB"/></a>
                    <a href="https://go.dev/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg"
                        alt="Golang"/></a>
                    <a href="https://godotengine.org/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/godot/godot-original.svg"
                        alt="Godot"/></a>
                    <a href="https://reactnative.dev/" target="_blank"><img
                        src="https://reactnative.dev/img/header_logo.svg"
                        alt="React Native"/></a>
                    <a href="https://www.solidjs.com/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/solidjs/solidjs-original.svg"
                        alt="SolidJS"/></a>
                    <a href="https://www.rust-lang.org/" target="_blank"><img
                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg"
                        alt="Rust"/></a>
                </div>

                <section>
                    <div className="soft">
                        <h3 className="max-w-2xl text-base md:text-xl dark:text-neutral-200">IDE & Logiciels</h3>
                        <a href="https://www.jetbrains.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jetbrains/jetbrains-original.svg"
                            alt="Jetbrains"/></a>
                        <a href="https://code.visualstudio.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg"
                            alt="Visual Studio Code"/></a>
                        <a href="https://www.office.com/" target="_blank"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_365_%282022%29.svg"
                            alt="Office 365"/></a>
                        <a href="https://www.adobe.com/creativecloud.html" target="_blank"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg"
                            alt="Creative Cloud"/></a>

                    </div>
                    <div className="tools">
                        <h3 className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Outils</h3>
                        <a href="https://www.canva.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/canva/canva-original.svg"
                            alt="Canva"/></a>
                        <a href="https://www.figma.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg"
                            alt="Figma"/></a>
                        <a href="https://trello.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/trello/trello-plain.svg"
                            alt="Trello"/></a>
                        <a href="https://git-scm.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
                            alt="Git"/></a>
                    </div>
                    <div className="os">
                        <h3 className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Systèmes d'exploitation</h3>
                        <a href="https://windows.com/" target="_blank"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg"
                            alt="Windows 10/11"/></a>
                        <a href="https://www.debian.org/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/debian/debian-original.svg"
                            alt="Debian"/></a>
                        <a href="https://getfedora.org/fr/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fedora/fedora-original.svg"
                            alt="Fedora"/></a>
                        <a href="https://ubuntu.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ubuntu/ubuntu-plain.svg"
                            alt="Ubuntu"/></a>

                    </div>
                    <div className="other">
                        <h3 className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Autres outils</h3>
                        <a href="https://en.wikipedia.org/wiki/Bash_(Unix_shell)" target="_blank"><img
                            src="https://bashlogo.com/img/symbol/svg/full_colored_light.svg" alt="Bash"/></a>
                        <a href="https://cmake.org/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cmake/cmake-original.svg"
                            alt="Cmake"/></a>
                        <a href="https://eslint.org/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg"
                            alt="ESLint"/></a>
                        <a href="https://www.npmjs.com/" target="_blank"><img
                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg"
                            alt="NPM"/></a>
                    </div>
                </section>
            </section>


            <h1 className="text-2xl md:text-7xl font-bold dark:text-white p-20">
                Ma timeline
            </h1>

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

