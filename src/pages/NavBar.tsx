"use client";
import React from "react";
import {FloatingNav} from "@/components/ui/floating-navbar";
import {IconHome, IconMessage, IconUser} from "@tabler/icons-react";

export default function NavBar() {
    const navItems = [
        {
            name: "Accueil",
            link: "#",
            icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white"/>,
        },
        {
            name: "Projets",
            link: "#projects",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white"/>,
        },
        {
            name: "Langages & Outils",
            link: "#langages-outils",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white"/>,
        },
        {
            name: "Timeline",
            link: "#timeline",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white"/>,
        },
        {
            name: "Ptohographies",
            link: "#photos",
            icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white"/>,
        },
        {
            name: "Contributions",
            link: "" +
                "#contributions",
            icon: (
                <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white"/>
            ),
        },
    ];
    return (
        <div className="relative  w-full">
            <FloatingNav navItems={navItems}/>
        </div>
    );
}

