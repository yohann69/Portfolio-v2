import {MacBook} from "@/pages/MacBook";
import {Gemini} from "@/pages/Gemini";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between">
			<MacBook/>
			<Gemini/>
		</main>
	);
}
