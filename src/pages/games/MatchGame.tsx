import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResultSave from "../../components/game/GameResultSave";
import { wordsById } from "../../data";
import { useGameSession } from "../../hooks/useGameSession";
import { useFeedbackAudio } from "../../hooks/useFeedbackAudio";
import { useWordAudio } from "../../hooks/useWordAudio";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import { shuffle } from "../../utils/shuffle";
import "./MatchGame.css";

interface MatchGameProps {
	lesson: Lesson;
}

interface MatchRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

function MatchGame({ lesson }: MatchGameProps) {
	const [round, setRound] = useState(0);

	if (!lesson.content.wordIds.some((id) => wordsById.has(id))) {
		return <Navigate to={`/lekcija/${lesson.id}`} replace />;
	}

	return (
		<MatchRound
			key={round}
			lesson={lesson}
			onReplay={() => setRound((r) => r + 1)}
		/>
	);
}

function MatchRound({ lesson, onReplay }: MatchRoundProps) {
	const words = lesson.content.wordIds
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => word !== undefined);

	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "matching",
		itemIds: words.map((w) => w.id),
	});

	const [enWords] = useState(() => shuffle(words));
	const [slWords] = useState(() => shuffle(words));

	const { play, error } = useWordAudio();
	const { play: playFeedback } = useFeedbackAudio();

	const [selectedEn, setSelectedEn] = useState<string | null>(null);
	const [selectedSl, setSelectedSl] = useState<string | null>(null);
	const [solved, setSolved] = useState<Set<string>>(new Set());
	const [showResult, setShowResult] = useState(false);
	const [wrong, setWrong] = useState<{ en: string; sl: string } | null>(null);

	useEffect(() => {
		if (!wrong) return;
		const timer = setTimeout(() => setWrong(null), 600);
		return () => clearTimeout(timer);
	}, [wrong]);

	function handleSelect(column: "en" | "sl", id: string) {
		if (result !== null || wrong || solved.has(id)) return;

		const en = column === "en" ? id : selectedEn;
		const sl = column === "sl" ? id : selectedSl;

		if (en === null || sl === null) {
			if (id !== (column === "en" ? selectedEn : selectedSl))
				playFeedback("tap");
			setSelectedEn(en);
			setSelectedSl(sl);
			return;
		}

		if (en === sl) {
			dispatch({ type: "answer", itemId: en, correct: true });
			setSolved((prev) => new Set(prev).add(en));
			const word = wordsById.get(en);
			const isLastPair = solved.size + 1 === words.length;
			function finishRound() {
				setShowResult(true);
				playFeedback("complete");
			}
			playFeedback(true, () => {
				if (word) play(word, isLastPair ? finishRound : undefined);
				else if (isLastPair) finishRound();
			});
		} else {
			playFeedback(false);
			dispatch({ type: "answer", itemId: en, correct: false });
			setWrong({ en, sl });
		}
		setSelectedEn(null);
		setSelectedSl(null);
	}

	function renderItem(word: Word, column: "en" | "sl") {
		const isSolved = solved.has(word.id);
		const isSelected =
			(column === "en" ? selectedEn : selectedSl) === word.id;
		const isWrong = wrong !== null && wrong[column] === word.id;
		let className = "match__item";
		if (isSolved) className += " match__item--solved";
		else if (isWrong) className += " match__item--wrong";
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

	if (result !== null && showResult) {
		return (
			<GameResultSave
				title="Poveži besede"
				className="match"
				lessonId={lesson.id}
				result={result}
				onReplay={onReplay}
			/>
		);
	}

	return (
		<main className="match">
			<GameHeader
				title="Poveži besede"
				done={resolvedCount}
				total={totalCount}
			/>

			{error && <p role="alert">{error}</p>}

			<div className="match__board">
				<div className="match__column">
					{enWords.map((word) => renderItem(word, "en"))}
				</div>
				<div className="match__column">
					{slWords.map((word) => renderItem(word, "sl"))}
				</div>
			</div>
		</main>
	);
}

export default MatchGame;
