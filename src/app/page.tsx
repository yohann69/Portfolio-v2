import {MacBook} from "@/pages/MacBook";
import {Gemini} from "@/pages/Gemini";
import {TracingBeam} from "@/components/ui/tracing-beam";
import React from "react";
import {BackgroundGradientAnimation} from "@/components/ui/background-gradient-animation";
import {Sparkles} from "@/pages/Particules";
import {NavBar} from "@/pages/NavBar";
import {Cards} from "@/pages/Cards";
import {Pictures} from "@/pages/Pictures";
import {MultiTabs} from "@/pages/MultiTabs";
import {CodeCard} from "@/pages/CodeCard";
import {WaveBackground} from "@/pages/WaveBackground";

export default function Home() {
	return (
		<>
			<NavBar/>
			<WaveBackground/>
			<Cards/>
			<Sparkles/>

			<TracingBeam>
				<MultiTabs/>

				<MacBook/>
			</TracingBeam>

			
			<Pictures/>
			<Gemini/>

			<CodeCard/>

			<BackgroundGradientAnimation>
				<div className="contactForm">
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

