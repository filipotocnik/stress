import Tobi, { type TobiMood } from "./Tobi";
import "./TobiBubble.css";

interface TobiBubbleProps {
	mood?: TobiMood;
	message: string;
	size?: number; // velikost celotnega Tobija
	cropped?: boolean; // Tobi v okroglem izrezu (samo stranska kartica na Roadmapu)
}

// Premer kroga glede na velikost Tobija (krog 112px pri Tobiju 144px)
const CIRCLE_RATIO = 112 / 144;

// Tobi in zraven oblaček s sporočilom
function TobiBubble({
	mood = "happy",
	message,
	size = 96,
	cropped = false,
}: TobiBubbleProps) {
	const circle = Math.round(size * CIRCLE_RATIO);

	return (
		<div className="tobi-bubble">
			{cropped ? (
				<span
					className="tobi-bubble__circle"
					style={{ width: circle, height: circle }}
				>
					<Tobi mood={mood} size={size} />
				</span>
			) : (
				<Tobi
					mood={mood}
					size={size}
					className="tobi-bubble__character"
				/>
			)}
			{/* Bralnik zaslona prebere novo sporočilo, ko se to spremeni */}
			<p className="tobi-bubble__message" aria-live="polite">
				{message}
			</p>
		</div>
	);
}

export default TobiBubble;
