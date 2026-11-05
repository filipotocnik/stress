import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResultSave from "../../components/game/GameResultSave";
import { wordsById } from "../../data";
import { openmoji } from "../../data/images";
import { useFeedbackAudio } from "../../hooks/useFeedbackAudio";
import { useGameSession } from "../../hooks/useGameSession";
import { useWordAudio } from "../../hooks/useWordAudio";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import { shuffle } from "../../utils/shuffle";
import "./MemoryGame.css";

interface MemoryGameProps {
	lesson: Lesson;
}

interface MemoryRoundProps extends MemoryGameProps {
	onReplay: () => void;
}

interface MemoryCard {
	id: string;
	kind: "en" | "image";
	word: Word;
}

const MISMATCH_DELAY = 1000;
const CARD_BACK_IMAGE = openmoji("2754");

function MemoryGame({ lesson }: MemoryGameProps) {
	const [round, setRound] = useState(0);

	if (!lesson.content.wordIds.some((id) => wordsById.has(id))) {
		return <Navigate to={`/lekcija/${lesson.id}`} replace />;
	}

	return (
		<MemoryRound
			key={`${lesson.id}:${round}`}
			lesson={lesson}
			onReplay={() => setRound((r) => r + 1)}
		/>
	);
}

function MemoryRound({ lesson, onReplay }: MemoryRoundProps) {
	const [words] = useState(() =>
		[...new Set(lesson.content.wordIds)]
			.map((id) => wordsById.get(id))
			.filter((word): word is Word => word !== undefined),
	);
	const [cards] = useState(() =>
		shuffle(
			words.flatMap<MemoryCard>((word) => [
				{ id: `${word.id}:en`, kind: "en", word },
				{ id: `${word.id}:image`, kind: "image", word },
			]),
		),
	);
	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "memory",
		itemIds: words.map((word) => word.id),
	});
	const { play, stop, error } = useWordAudio();
	const { play: playFeedback, stop: stopFeedback } = useFeedbackAudio();
	const [selected, setSelected] = useState<MemoryCard[]>([]);
	const [solved, setSolved] = useState<Set<string>>(() => new Set());
	const [turns, setTurns] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [lastWord, setLastWord] = useState<Word>();
	const isWaiting = selected.length === 2;

	useEffect(() => {
		if (!isWaiting) return;
		const timer = window.setTimeout(() => {
			setSelected([]);
		}, MISMATCH_DELAY);
		return () => window.clearTimeout(timer);
	}, [isWaiting]);

	function handleFlip(card: MemoryCard) {
		if (
			result !== null ||
			isWaiting ||
			solved.has(card.word.id) ||
			selected.some((item) => item.id === card.id)
		) {
			return;
		}

		stopFeedback();
		stop();
		const first = selected[0];
		if (!first) {
			setSelected([card]);
			playFeedback("tap");
			return;
		}

		setTurns((count) => count + 1);
		const isMatch =
			first.word.id === card.word.id && first.kind !== card.kind;
		if (isMatch) {
			setSolved((previous) => new Set(previous).add(card.word.id));
			setSelected([]);
			dispatch({ type: "resolve-pair", itemId: card.word.id });
			setLastWord(card.word);
			const isLastPair = solved.size + 1 === words.length;
			playFeedback(true, () =>
				play(card.word, isLastPair ? finishRound : undefined),
			);
		} else {
			setSelected([first, card]);
			dispatch({ type: "memory-mismatch" });
			playFeedback(false);
		}
	}

	function finishRound() {
		setShowResult(true);
		playFeedback("complete");
	}

	if (showResult && result?.gameType === "memory") {
		return (
			<GameResultSave
				title="Spomin"
				className="memory"
				lessonId={lesson.id}
				result={result}
				onReplay={onReplay}
			/>
		);
	}

	function renderCard(card: MemoryCard, index: number) {
		const isSolved = solved.has(card.word.id);
		const isOpen = isSolved || selected.some((item) => item.id === card.id);
		const isUnavailable = isOpen || isWaiting || result !== null;
		let className = "memory__card";
		if (isOpen) className += " memory__card--open";
		if (isSolved) className += " memory__card--solved";
		const label = isOpen
			? card.kind === "en"
				? card.word.en
				: `Slika: ${card.word.sl}`
			: `Obrni kartico ${index + 1}`;

		return (
			<button
				key={card.id}
				type="button"
				className={className}
				aria-label={isSolved ? `${label}, najden par` : label}
				aria-pressed={isOpen}
				aria-disabled={isUnavailable}
				onClick={() => handleFlip(card)}
			>
				<span className="memory__card-inner" aria-hidden="true">
					<span className="memory__face memory__back">
						<img
							src={CARD_BACK_IMAGE}
							alt=""
							width={72}
							height={72}
							draggable={false}
						/>
					</span>
					<span className="memory__face memory__front">
						{card.kind === "en" ? (
							<span className="memory__word" lang="en">
								{card.word.en}
							</span>
						) : (
							<img
								className="memory__image"
								src={card.word.imageSrc}
								alt=""
								width={80}
								height={80}
								draggable={false}
							/>
						)}
					</span>
				</span>
			</button>
		);
	}

	return (
		<main className="game-screen memory">
			<GameHeader
				title="Spomin"
				done={resolvedCount}
				total={totalCount}
			/>
			<p className="memory__turns">Število potez: {turns}</p>
			{error && (
				<div className="game-audio-error" role="alert">
					<p>{error}</p>
					<button
						type="button"
						className="game-retry"
						onClick={() => {
							stopFeedback();
							if (lastWord) play(lastWord);
						}}
					>
						Poslušaj znova
					</button>
				</div>
			)}
			<div
				className="memory__board"
				role="group"
				aria-label="Kartice za igro spomin"
			>
				{cards.map(renderCard)}
			</div>
		</main>
	);
}

export default MemoryGame;
