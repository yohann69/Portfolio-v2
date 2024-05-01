"use client";

import Image from "next/image";
import {Tabs} from "@/components/ui/tabs";
import React from "react";

export default function MultiTabs() {
    const tabs = [
        {
            title: "Outil d'éligibilité ADN",
            value: "adn",
            content: (
                <div
                    className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-blue-950">
                    <p>Outil d&apos;éligibilité ADN</p>
                    <ELIGIBILITEADN/>
                </div>
            ),
        },
        {
            title: "VOYO",
            value: "services",
            content: (
                <div
                    className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-500 to-orange-600">
                    <p>VOYO</p>
                    <VOYOAPP/>
                </div>
            ),
        },
        {
            title: "ADE Calendar",
            value: "playground",
            content: (
                <div
                    className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>ADE Calendar</p>
                    <ADECALENDAR/>
                </div>
            ),
        },
    ];

    return (
        <div
            className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
            <Tabs tabs={tabs}/>
        </div>
    );
}

const ELIGIBILITEADN = () => {
    return (
        <>
            <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200 p-2">L&apos;<a
                href="https://ardechedromenumerique.fr/eligibilite"
                target="_blank" style={{
                color: 'white',
                textDecoration: 'underline',
                fontWeight: 'bold'
            }}>outil d&apos;eligibilite</a> d&apos;Ardèche Drome Numérique est le premier projet que
                j&apos;ai eu lors de ma première immersion en entreprise durant mon BUT en 2023.

                <br/>
                <br/>
                Cette application web permet aux habitants de l&apos;Ardèche et de la Drôme de vérifier leur
                éligibilité à la fibre optique. Elle est basée sur une carte interactive qui permet de visualiser les
                zones couvertes par le réseau ADN.
                Durant le développement de cette application, j&apos;ai pu mettre en pratique mes compétences en
                développement web, apprendre le Golang, Solid.JS et les commandes de base de PostGis en cartographie.

                <br/>
                <br/>

                Ce service crutial est utilisé désormais par de nombreux utilisateurs quotidiennement

            </p>
            <Image
                src="/adnlogo-300x262.png"
                alt="dummy image"
                width={200}
                height={200}
                style={{bottom: '10px', right: '50px', position: 'absolute'}}
            />
        </>

    );
};
const VOYOAPP = () => {
    return (
        <>
            <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200 p-2">
                VOYO est un projet scolaire que nous avons du réaliser par groupe de 4 lors de ma 3ème année de BUT.
                Le but était de développer une application mobile fonctionnant aussi bien sous Android que sous iOS
                permettant de mettre en relation deux types d&apos;utilisateurs: les prospects, qui cherchent à faire
                visiter un bien immobilier et les visiteurs, qui souhaitent visiter un bien immobilier.

                <br/>
                <br/>

                Etant donné que nous avions le choix des technologies à utiliser, nous avons décidé d&apos;utiliser
                React Native pour le développement de l&apos;application ainsi que Golang pour le Backend et Firebase
                pour la base de données du chat. Pour la base de donnée globale, nous avons utilisé PostgreSQL avec
                l&apos;extension PostGis afin de pouvoir manipuler des données géographiques.

                <br/>
                <br/>

                Ce projet m&apos;a permis de monter en compétences en développement mobile, d&apos;apprendre à utiliser
                les API Google Maps et de gérer un projet/équipe de développement.
            </p>
            <Image
                src="/banner-voyo-full-wws.png"
                alt="dummy image"
                width={200}
                height={200}
                style={{bottom: '10px', right: '50px', position: 'absolute'}}
            />
        </>

    );
};

const ADECALENDAR = () => {
    return (
        <>
            <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200 p-2">
                <a
                    href="https://ade.pages.dev"
                    target="_blank" style={{
                    color: 'white',
                    textDecoration: 'underline',
                    fontWeight: 'bold'
                }}>ADE Calendar</a> est un site web que j&apos;ai développé en première année de BUT afin de
                pallier au manque d&apos;une interface responsive pour les emplois du temps de l&apos;IUT de Valence.
                <br/>
                <br/>
                J&apos;ai du pour ce faire trouver l&apos;api du site de l&apos;IUT, la parser et la mettre en forme
                pour l&apos;afficher sur un site web. Etant donné que l&apos;API renvoyait un ICS, j&apos;ai écrit une
                nouvelle API en Golang qui parse l&apos;ICS et renvoie un JSON à la place car le JSON est un format plus
                facile à manipuler en JavaScript.

                <br/>
                <br/>
                Ce projet m&apos;a permis de monter en compétences en développement web, d&apos;apprendre à utiliser des
                API et de travailler avec des données complexes. Cela dit, étant donné que j&apos;ai réalisé le
                développement du projet en 1ère année, je ne savais pas utiliser de framework web donc tout le
                traitement et l&apos;affichage est fait &lsquo;à la main&lsquo; en JavaScript et HTML/CSS
            </p>
            <Image
                src="/calendaricon.png"
                alt="dummy image"
                width={100}
                height={100}
                style={{bottom: '30px', right: '50px', position: 'absolute'}}
            />
        </>

    );
};
