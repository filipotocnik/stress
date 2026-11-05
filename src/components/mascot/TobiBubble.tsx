import { getTobiOutfit } from "../../data/outfits";
import { useProgress } from "../../hooks/useProgress";
import Tobi, { type TobiMood } from "./Tobi";
import "./TobiBubble.css";

interface TobiBubbleProps {
	mood?: TobiMood;
	message: string;
	size?: number;
}

// Tobi in zraven oblaček s sporočilom
function TobiBubble({ mood = "happy", message, size = 96 }: TobiBubbleProps) {
	const { user } = useProgress();
	const outfit = getTobiOutfit(user?.activeOutfit);

	return (
		<div className="tobi-bubble">
			<Tobi
				mood={mood}
				size={size}
				outfit={outfit}
				className="tobi-bubble__character"
			/>
			{/* Bralnik zaslona prebere novo sporočilo, ko se to spremeni */}
			<p className="tobi-bubble__message" aria-live="polite">
				{message}
			</p>
		</div>
	);
}

export default TobiBubble;
