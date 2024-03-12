"use client";

import Image from "next/image";
import {Tabs} from "@/components/ui/tabs";

export function MultiTabs() {
	const tabs = [
		{
			title: "Outil d'éligibilité ADN",
			value: "adn",
			content: (
				<div
					className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-600 to-blue-900">
					<p>Outil d'éligibilité ADN</p>
					<DummyContent/>
				</div>
			),
		},
		{
			title: "VOYO",
			value: "services",
			content: (
				<div
					className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-600 to-orange-500">
					<p>Services tab</p>
					<DummyContent/>
				</div>
			),
		},
		{
			title: "ADE Calendar",
			value: "playground",
			content: (
				<div
					className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
					<p>Playground tab</p>
					<DummyContent/>
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

const DummyContent = () => {
	return (
		<>

			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<Image
				src="/vercel.svg"
				alt="dummy image"
				layout="responsive"
				width={300}
				height={300}
			/>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>
			<p>fzfzafa</p>

		</>

	);
};
