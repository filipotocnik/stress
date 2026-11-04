import Tobi, { type TobiMood } from "./Tobi";
import "./TobiBubble.css";

interface TobiBubbleProps {
	mood?: TobiMood;
	message: string;
	size?: number; // velikost celotnega Tobija, krog je nekoliko manjši
}

// Premer kroga glede na velikost Tobija (krog 112px pri Tobiju 144px)
const CIRCLE_RATIO = 112 / 144;

// Tobi v okroglem izrezu, zraven pa oblaček s sporočilom
function TobiBubble({ mood = "happy", message, size = 144 }: TobiBubbleProps) {
	const circle = Math.round(size * CIRCLE_RATIO);

	return (
		<div className="tobi-bubble">
			<span
				className="tobi-bubble__character"
				style={{ width: circle, height: circle }}
			>
				<Tobi mood={mood} size={size} />
			</span>
			{/* Bralnik zaslona prebere novo sporočilo, ko se to spremeni */}
			<p className="tobi-bubble__message" aria-live="polite">
				{message}
			</p>
		</div>
	);
}

export default TobiBubble;
