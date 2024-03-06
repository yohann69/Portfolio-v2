import React from "react";
import {MacbookScroll} from "@/components/ui/macbook-scroll";

export function MacBook() {
	return (
		<div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
			<MacbookScroll
				title={
					<span>
			This Macbook is built with Tailwindcss. <br/> No kidding.
	</span>
				}

				src={`/vercel.svg`}
				showGradient={false}
			/>
		</div>
	);
}