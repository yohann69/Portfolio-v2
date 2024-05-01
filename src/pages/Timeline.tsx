"use client";
import React from "react";


export default function Timeline() {
    return (
        <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden p-10 h-full">
                <div className="border-2-2 border-yellow-555 absolute h-full border testclasse"></div>
                <div className="border-2-2 border-yellow-555 absolute h-full border testclasse2"></div>
                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-base text-yellow-300"> Septembre 2021 - Juillet 2024</p>

                        <h4 className="mb-3 font-bold text-lg md:text-2xl">BUT Informatique - IUT de
                            Valence</h4>

                        <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Après l&apos;obtention
                            de mon baccalauréat, j&apos;ai décidé de poursuivre mes études en intégrant un BUT
                            Informatique.
                            Cette formation m&apos;a particulièrement attiré car elle offrait l&apos;opportunité
                            de réaliser une alternance en 3ème année, me permettant ainsi d&apos;allier théorie et
                            pratique.
                            Au
                            cours de ces trois années, j&apos;ai pu acquérir des compétences solides en programmation,
                            en
                            développement web et en gestion de projet, préparant ainsi le terrain pour la suite de
                            mon parcours professionnel.</p>
                    </div>
                </div>

                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1  w-5/12 px-1 py-4">
                        <p className="mb-3 text-base text-yellow-300">Septembre 2023 - Juillet 2024</p>

                        <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Altenance développeur full stack -
                            Ardèche Drome Numérique</h4>

                        <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200">Ma première
                            expérience professionnelle prolongée s&apos;est déroulée chez Ardèche Drôme Numérique en
                            tant que
                            développeur full stack en alternance. Cette opportunité m&apos;a permis de découvrir le
                            monde de
                            l&apos;entreprise et d&apos;apprendre le langage Go, SolidJS et PostGIS à travers différents
                            développements de solutions internes. J&apos;ai également contribué au développement de
                            l&apos;outil
                            d&apos;éligibilité accessible sur le site web de l&apos;entreprise:
                            <a href="https://ardechedromenumerique.fr/eligibilite"
                               target="_blank"> https://ardechedromenumerique.fr/eligibilite</a>.
                        </p>
                    </div>
                </div>

                <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                        <p className="mb-3 text-base text-yellow-300">24 Février - 28 Février 2024 </p>

                        <h4 className="mb-3 font-bold text-lg md:text-2xl">Participation au MWC à Barcelone</h4>

                        <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200">En tant que
                            modérateur sur la <a href="https://c.mi.com/fr/" target="_blank">communauté Xiaomi
                                France</a>, j&apos;ai eu la chance d&apos;être invité à assister au Mobile World
                            Congress ainsi
                            qu&apos;au lancement de la série Xiaomi 14 en global (hors de Chine). J&apos;ai également
                            rejoint les
                            rangs de l&apos;équipe photographie sur la <a href="https://c.mi.com/fr/" target="_blank">communauté
                                Xiaomi global</a> pendant le séjour.</p>
                    </div>
                </div>

                <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1  w-5/12 px-1 py-4">
                        <p className="mb-3 text-base text-yellow-300">Septembre 2024 - Juillet 2027</p>

                        <h4 className="mb-3 font-bold  text-lg md:text-2xl text-left">Ingénieur informatique en
                            alternance - IMT Atlantique</h4>

                        <p className="max-w-2xl text-base md:text-xl dark:text-neutral-200">J&apos;ai récemment
                            été admis dans la formation d&apos;ingénieur informatique, spécialité Ingénierie Logicielle,
                            au
                            sein de la prestigieuse école IMT Atlantique à Nantes. Cette formation de 3 ans me permettra
                            d&apos;approfondir mes connaissances en programmation tout en développant mes compétences
                            professionnelles grâce à un contrat d&apos;apprentissage. </p>
                    </div>
                </div>
            </div>
        </div>);
}