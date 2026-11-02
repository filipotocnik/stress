import { useState } from "react";
import GameHeader from "../../components/game/GameHeader";
import { wordsById } from "../../data";
import { useGameSession } from "../../game/useGameSession";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import "./MatchGame.css";

interface MatchGameProps {
	lesson: Lesson;
}

// Vrne nov, naključno premešan seznam (Fisher-Yates)
function shuffle<T>(items: T[]) {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

// Igra: poveži slovensko in angleško besedo
function MatchGame({ lesson }: MatchGameProps) {
	// Besede poiščemo po id-ju, neznane id-je izpustimo
	const words = lesson.content.wordIds
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => word !== undefined);

	const { resolvedCount, totalCount, isComplete, dispatch } = useGameSession({
		gameType: "matching",
		itemIds: words.map((w) => w.id),
	});

	// Stolpca premešamo samo enkrat, ob začetku igre
	const [enWords] = useState(() => shuffle(words));
	const [slWords] = useState(() => shuffle(words));

	const [selectedEn, setSelectedEn] = useState<string | null>(null);
	const [selectedSl, setSelectedSl] = useState<string | null>(null);
	const [solved, setSolved] = useState<Set<string>>(new Set());

	function handleSelect(column: "en" | "sl", id: string) {
		const en = column === "en" ? id : selectedEn;
		const sl = column === "sl" ? id : selectedSl;

		// Izbrana je šele ena beseda, počakamo na drugo
		if (en === null || sl === null) {
			setSelectedEn(en);
			setSelectedSl(sl);
			return;
		}

		if (en === sl) {
			dispatch({ type: "answer", itemId: en, correct: true });
			setSolved((prev) => new Set(prev).add(en));
		} else {
			dispatch({ type: "answer", itemId: en, correct: false });
		}
		setSelectedEn(null);
		setSelectedSl(null);
	}

	function renderItem(word: Word, column: "en" | "sl") {
		const isSolved = solved.has(word.id);
		const isSelected =
			(column === "en" ? selectedEn : selectedSl) === word.id;
		let className = "match__item";
		if (isSolved) className += " match__item--solved";
		else if (isSelected) className += " match__item--selected";

		return (
			<button
				key={word.id}
				className={className}
				disabled={isSolved}
				aria-pressed={isSelected}
				onClick={() => handleSelect(column, word.id)}
			>
				{column === "en" ? word.en : word.sl}
			</button>
		);
	}

	return (
		<main className="match">
			<GameHeader
				title="Poveži besede"
				done={resolvedCount}
				total={totalCount}
			/>

			{isComplete ? (
				<p className="match__done">Vse besede so povezane!</p>
			) : (
				<div className="match__board">
					<div className="match__column">
						{enWords.map((word) => renderItem(word, "en"))}
					</div>
					<div className="match__column">
						{slWords.map((word) => renderItem(word, "sl"))}
					</div>
				</div>
			)}
		</main>
	);
}

export default MatchGame;
