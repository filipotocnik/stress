import GameHeader from "../../components/game/GameHeader";
import type { Lesson } from "../../models/lesson";

interface MatchGameProps {
	lesson: Lesson;
}

// Igra: poveži slovensko in angleško besedo
function MatchGame({ lesson }: MatchGameProps) {
	return (
		<main className="match">
			<GameHeader
				title="Poveži besede"
				done={0}
				total={lesson.content.wordIds.length}
			/>
		</main>
	);
}

export default MatchGame;
