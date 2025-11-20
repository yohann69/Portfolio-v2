"use client";

import React from 'react';
import { Clock, Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const events = [
    {
        id: 1,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Alternant développeur',
        company: 'La Poste',
        type: 'work',
        description: "Contrat d'apprentissage de 3 ans pour devenir développeur full stack. Mise en pratique des compétences acquises et formation continue en développement web et gestion de projet."
    },
    {
        id: 2,
        date: '2024-09',
        endDate: '2027-07',
        title: 'Ingénieur informatique',
        company: 'IMT Atlantique',
        type: 'education',
        description: "Formation d'ingénieur informatique, spécialité Ingénierie Logicielle. Approfondissement des connaissances en programmation et développement de compétences professionnelles."
    },
    {
        id: 3,
        date: '2024-02',
        endDate: '2024-02',
        title: 'Participation au MWC',
        company: 'Barcelone',
        type: 'event',
        description: "Invité au Mobile World Congress et au lancement de la série Xiaomi 14. Membre de l'équipe photographie Xiaomi Global."
    },
    {
        id: 4,
        date: '2023-09',
        endDate: '2024-07',
        title: 'Alternant développeur full stack',
        company: 'Ardèche Drome Numérique',
        type: 'work',
        description: "Développement de solutions internes en Go, SolidJS et PostGIS. Contribution à l'outil d'éligibilité fibre."
    },
    {
        id: 5,
        date: '2021-09',
        endDate: '2024-07',
        title: 'BUT Informatique',
        company: 'IUT de Valence',
        type: 'education',
        description: "Acquisition de compétences solides en programmation, développement web et gestion de projet. Alternance en 3ème année."
    }
];

export default function ExperienceLog() {
    return (
        <div className="h-full bg-[#0d1117] text-gray-300 font-mono p-6 overflow-auto">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-2xl font-bold text-white mb-2">System_Event_Log</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Running</span>
                        <span>PID: 1337</span>
                        <span>User: yohann</span>
                    </div>
                </div>

                <div className="space-y-0 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-800" />

                    {events.map((event, index) => (
                        <div key={event.id} className="relative pl-12 py-6 group">
                            {/* Dot */}
                            <div className="absolute left-[11px] top-8 w-2.5 h-2.5 rounded-full bg-gray-600 border-2 border-[#0d1117] group-hover:bg-blue-500 group-hover:scale-125 transition-all z-10" />

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-blue-400">
                                    <span className="bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                        {event.date} -&gt; {event.endDate}
                                    </span>
                                    <span className="text-gray-600">
                                        [{event.type.toUpperCase()}]
                                    </span>
                                </div>

                                <div className="bg-[#161b22] border border-gray-800 rounded-lg p-4 hover:border-gray-600 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {event.title}
                                        </h3>
                                        {event.type === 'work' ? <Briefcase className="w-4 h-4 text-gray-500" /> :
                                            event.type === 'education' ? <GraduationCap className="w-4 h-4 text-gray-500" /> :
                                                <MapPin className="w-4 h-4 text-gray-500" />}
                                    </div>

                                    <div className="text-sm text-green-500 font-bold mb-3">
                                        @ {event.company}
                                    </div>

                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center text-xs text-gray-600 animate-pulse">
                    _ End of log stream _
                </div>
            </div>
        </div>
    );
}
