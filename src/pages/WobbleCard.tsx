"use client";
import Image from "next/image";
import React from "react";
import {WobbleCard} from "@/components/ui/wobble-card";

export default function WobbleCardDemo() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            <WobbleCard
                containerClassName="col-span-1 lg:col-span-2 h-full bg-orange-600 min-h-[500px] lg:min-h-[300px]"
                className=""
            >
                <div>
                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Modérateur de la communauté Xiaomi France
                    </h2>
                    <p className="mt-4 text-left max-w-[600px] text-base/6 text-neutral-200">
                        Avec plusieurs milliers d&apos;utilisateurs actifs chaque mois, la communauté Xiaomi France est un
                        lieu de d&apos;échanges et de partage autour des produits Xiaomi. En tant que modérateur, je veille à
                        ce que les règles de la communauté soient respectées, que les utilisateurs soient aidés et que
                        les informations soient claires et précises. J&apos;organise également des événements, des concours
                        et des sondages pour animer la communauté et renforcer les liens entre les membres.
                        <br/>
                        <br/>
                        Au sein de la communauté Xiaomi Global, je fais partie de l&apos;équipe photographie, où je partage
                        mes clichés et mes conseils avec les autres membres. J&apos;ai également l&apos;opportunité de tester des
                        téléphones et de participer à des événements exclusifs.

                    </p>
                </div>
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg"
                    width={100}
                    height={100}
                    alt="linear demo image"
                    className="absolute -right-4 lg:right-[33px] grayscale filter bottom-8 object-contain rounded-2xl"
                />
            </WobbleCard>


            <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                    Traduction de projets.
                </h2>
                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                    Je participe activement à la traduction française de plusieurs projets, notamment les services <a
                    href="https://proton.me" target="_blank">Proton</a> et <a href="https://2fas.com/"
                                                                              target="_blank">2FAs</a>. Cette activité
                    de traduction en ligne me permet non seulement d&apos;améliorer mon niveau d&apos;anglais en renforçant ma
                    compréhension et mon interprétation, mais également de contribuer bénévolement à l&apos;amélioration des
                    services que j&apos;utilise quotidiennement.
                </p>
            </WobbleCard>


            <WobbleCard
                containerClassName="col-span-1 lg:col-span-3 bg-green-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                <div>
                    <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        Tests de produits IOT et de l&apos;application Xiaomi Home
                    </h2>
                    <p className="mt-4 max-w-[65rem] text-left  text-base/6 text-neutral-200">
                        Depuis mai 2021, je participe à la phase de test de la version d&apos;essai privée de l&apos;application
                        Xiaomi Home, permettant de controller les appareils connectés de Xiaomi. À chaque nouvelle
                        version, je m&apos;assure qu&apos;aucun bug n&apos;est présent, que les différentes fonctionnalités sont
                        correctement traduites. Je veille également à ce que les fonctionnalités soient fluides et
                        intuitives, contribuant ainsi à améliorer l&apos;expérience utilisateur. Dans le cadre de ce
                        processus d&apos;amélioration, je propose régulièrement des suggestions.
                        <br/>

                        <br/>
                        J&apos;ai également l&apos;opportunité de tester une variété de produits Xiaomi et Dreame, tels que des
                        trottinettes, des écouteurs, des objets connectés (capteurs, lumières, sonnettes, télémètres),
                        des aspirateurs, et bien d&apos;autres. Durant ces tests, qui ont lieu avant la commercialisation des
                        produits, j&apos;ai évalué divers aspects tels que le logiciel, l&apos;expérience utilisateur et la
                        résistance, dans le but d&apos;améliorer le produit avant son lancement sur le marché.
                    </p>
                </div>
                <Image
                    src="/mijalogo.png"
                    width={100}
                    height={100}
                    alt="linear demo image"
                    className="absolute -right-4 lg:right-[33px] grayscale filter bottom-8 object-contain rounded-2xl"
                />
            </WobbleCard>
        </div>
    );
}
