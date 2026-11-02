import { useEffect, useState } from "react";
import GameHeader from "../../components/game/GameHeader";
import { wordsById } from "../../data";
import { useGameSession } from "../../game/useGameSession";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import "./MatchGame.css";
import { useProgress } from "../../progress/useProgress";
import type { GameResult as GameResultData } from "../../models/game";
import { getGameStars } from "../../game/scoring";
import { useGameResultSave } from "../../game/useGameResultSave";
import GameResult from "../../components/game/GameResult";
import { Navigate, useNavigate } from "react-router";

interface MatchGameProps {
	lesson: Lesson;
}

interface MatchRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

interface MatchSaveProps {
	lessonId: string;
	result: GameResultData;
	onReplay: () => void;
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
// Nov key ob ponovni igri začne krog od začetka in znova premeša besede
function MatchGame({ lesson }: MatchGameProps) {
	const [round, setRound] = useState(0);

	// Lekcija brez veljavnih besed nima igre
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

// En krog igre: tabla z besedami, na koncu rezultat
function MatchRound({ lesson, onReplay }: MatchRoundProps) {
	// Besede poiščemo po id-ju, neznane id-je izpustimo
	const words = lesson.content.wordIds
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => word !== undefined);

	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "matching",
		itemIds: words.map((w) => w.id),
	});

	// Stolpca premešamo samo enkrat, ob začetku igre
	const [enWords] = useState(() => shuffle(words));
	const [slWords] = useState(() => shuffle(words));

	const [selectedEn, setSelectedEn] = useState<string | null>(null);
	const [selectedSl, setSelectedSl] = useState<string | null>(null);
	const [solved, setSolved] = useState<Set<string>>(new Set());
	const [wrong, setWrong] = useState<{ en: string; sl: string } | null>(null);

	// Napačen par pokažemo 600 ms, tajmer počistimo, če igro zapustimo prej
	useEffect(() => {
		if (!wrong) return;
		const timer = setTimeout(() => setWrong(null), 600);
		return () => clearTimeout(timer);
	}, [wrong]);

	function handleSelect(column: "en" | "sl", id: string) {
		// Med prikazom napačnega para klike prezremo
		if (wrong) return;

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

	if (result !== null) {
		return (
			<MatchSave
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

// Rezultat kroga, ki se ob prikazu shrani v napredek
function MatchSave({ lessonId, result, onReplay }: MatchSaveProps) {
	const navigate = useNavigate();
	const { saveGame } = useProgress();
	const { status, save, retry } = useGameResultSave(result, (attempt) =>
		saveGame(lessonId, attempt),
	);

	useEffect(() => {
		void save();
	}, [save]);

	return (
		<main className="match">
			<GameResult
				title="Poveži besede"
				stars={getGameStars(result)}
				firstTryCorrect={result.firstTryCorrect}
				total={result.totalItems}
				onReplay={onReplay}
				onBack={() => navigate(`/lekcija/${lessonId}`)}
			/>

			{status === "saving" && (
				<p className="match__status" role="status">
					Shranjevanje rezultata…
				</p>
			)}
			{status === "error" && (
				<>
					<p className="auth-error" role="alert">
						Rezultata ni bilo mogoče shraniti.
					</p>
					<button
						className="match__retry"
						onClick={() => void retry()}
					>
						Poskusi znova
					</button>
				</>
			)}
		</main>
	);
}

export default MatchGame;
