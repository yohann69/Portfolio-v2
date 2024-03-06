import {MacBook} from "@/pages/MacBook";
import {Gemini} from "@/pages/Gemini";
import {TracingBeam} from "@/components/ui/tracing-beam";
import React from "react";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation";
import {EvervaultCard, Icon} from "@/components/ui/evervault-card";
import {Sparkles} from "@/pages/Particules";
import {NavBar} from "@/pages/NavBar";
import {Cards} from "@/pages/Cards";
import {Pictures} from "@/pages/Pictures";

export default function Home() {
	return (
		<>
			<NavBar/>
			<Sparkles/>
			<Cards/>
			<Pictures/>
			<TracingBeam>
				<MacBook/>
				<Gemini/>
				<div
					className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
					<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black"/>
					<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black"/>
					<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black"/>
					<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black"/>

					<EvervaultCard text="GEggzeg ezg ezgezgze gezgezgzegze"/>

					<h2 className="dark:text-white text-black mt-4 text-sm font-light">
						Hover over this card to reveal an awesome effect. Running out of copy
						here.
					</h2>
					<p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
						Watch me hover
					</p>
				</div>
			</TracingBeam>

			<BackgroundGradientAnimation>
				<div>
					<div
						className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
						<p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
							Contact me
						</p>
					</div>
					<div
						className="bg-green-500 bg-opacity-40 backdrop-blur-10 border border-green-500 border-opacity-20 h-300 w-100">
						<label className="text-white">email</label>
						<input type="text" placeholder="email@mail.com"/>
					</div>
				</div>

			</BackgroundGradientAnimation>
		</>
	);
}

