"use client";
import {TypewriterEffectSmooth} from "@/components/ui/tweffect";

export function Typewriter() {
    const words = [
        // {
        //     text: "Un",
        // },
        {
            text: "Alternant",
        },
        {
            text: "développeur",
        },
        // {
        //     text: "with",
        // },
        {
            text: "Full Stack",
            className: "text-blue-500 dark:text-orange-500",
        },
    ];
    return (
        <div className="flex flex-col items-center justify-center">
            <TypewriterEffectSmooth words={words}/>
        </div>
    );
}
