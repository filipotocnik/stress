import { useRef, useState } from "react";
import { Navigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResultSave from "../../components/game/GameResultSave";
import TobiBubble from "../../components/mascot/TobiBubble";
import { openmoji } from "../../data/images";
import {
	createListeningQuestions,
	getListeningWords,
} from "../../game/listening";
import { useTobiReaction } from "../../game/useTobiReaction";
import { useGameSession } from "../../hooks/useGameSession";
import { useFeedbackAudio } from "../../hooks/useFeedbackAudio";
import { useWordAudio } from "../../hooks/useWordAudio";
import type { Lesson } from "../../models/lesson";
import "./ListeningGame.css";

interface ListeningGameProps {
	lesson: Lesson;
}

interface ListeningRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

function ListeningGame({ lesson }: ListeningGameProps) {
	const [round, setRound] = useState(0);

	if (getListeningWords(lesson).length < 2) {
		return <Navigate to={`/lekcija/${lesson.id}`} replace />;
	}

	return (
		<ListeningRound
			key={round}
			lesson={lesson}
			onReplay={() => setRound((r) => r + 1)}
		/>
	);
}

function ListeningRound({ lesson, onReplay }: ListeningRoundProps) {
	const [questions] = useState(() => createListeningQuestions(lesson));
	const { play, stop, playingWordId, error } = useWordAudio();
	const { play: playFeedback, stop: stopFeedback } = useFeedbackAudio();
	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "listening",
		itemIds: questions.map((question) => question.word.id),
	});
	const tobi = useTobiReaction();
	const [index, setIndex] = useState(0);
	const [picked, setPicked] = useState<string | null>(null);
	const [wrong, setWrong] = useState<string[]>([]);
	const submissions = useRef(new Set<string>());
	const solved = useRef(false);
	const soundButton = useRef<HTMLButtonElement>(null);

	if (result !== null && index === questions.length) {
		return (
			<GameResultSave
				title="Poslušaj"
				className="listening"
				lessonId={lesson.id}
				result={result}
				onReplay={onReplay}
			/>
		);
	}

	const question = questions[index];

	function handlePick(id: string) {
		if (solved.current || submissions.current.has(id)) return;
		if (!question.options.some((option) => option.id === id)) return;
		submissions.current.add(id);
		const correct = id === question.word.id;
		dispatch({ type: "answer", itemId: question.word.id, correct });
		tobi.onAnswer(correct);
		stop();
		playFeedback(correct);

		if (correct) {
			solved.current = true;
			setPicked(id);
		} else {
			setWrong((prev) => [...prev, id]);
		}
	}

	function handleNext() {
		if (!solved.current) return;
		solved.current = false;
		submissions.current.clear();
		stopFeedback();
		stop();
		const next = index + 1;
		setIndex(next);
		setPicked(null);
		setWrong([]);
		if (next < questions.length) {
			playFeedback("next", () => play(questions[next].word), 180);
			soundButton.current?.focus();
		} else {
			playFeedback("complete");
		}
	}

	return (
		<main className="game-screen listening">
			<GameHeader
				title="Poslušaj"
				done={resolvedCount}
				total={totalCount}
			/>

			<div className="game-tobi">
				<TobiBubble mood={tobi.mood} message={tobi.message} />
			</div>

			<div className="listening__player">
				<button
					ref={soundButton}
					className={
						playingWordId === question.word.id
							? "listening__sound listening__sound--playing"
							: "listening__sound"
					}
					onClick={() => {
						stopFeedback();
						play(question.word);
					}}
					aria-label="Predvajaj besedo"
				>
					<span className="listening__sound-icon">
						<img
							src={openmoji("1F50A")}
							alt=""
							width={34}
							height={34}
						/>
					</span>
					<span>Poslušaj</span>
					<span className="listening__sound-waves" aria-hidden="true">
						<span />
						<span />
						<span />
					</span>
				</button>
				{error && (
					<p className="listening__audio" role="alert">
						{error} Pritisni Poslušaj za ponovni poskus.
					</p>
				)}
			</div>

			<div
				className="listening__options"
				role="group"
				aria-label="Izberi sliko"
			>
				{question.options.map((option) => {
					const isWrong = wrong.includes(option.id);
					const isCorrect = picked === option.id;
					let className = "listening__option";
					if (isCorrect) className += " listening__option--correct";
					else if (isWrong) className += " listening__option--wrong";

					return (
						<button
							key={option.id}
							className={className}
							aria-label={`Slika: ${option.sl}`}
							disabled={picked !== null || isWrong}
							onClick={() => handlePick(option.id)}
						>
							<img
								src={option.imageSrc}
								alt=""
								width={96}
								height={96}
							/>
							<span
								className="listening__mark"
								aria-hidden="true"
							>
								{isCorrect ? "✓" : isWrong ? "✗" : ""}
							</span>
						</button>
					);
				})}
			</div>

			<div className="game-feedback" aria-live="polite">
				{picked !== null && (
					<>
						{/* Odziv pove Tobi, tukaj ostane beseda, ki se je otrok uči */}
						<p className="game-message game-message--correct">
							<strong lang="en">{question.word.en}</strong>
						</p>
						<button className="game-action" onClick={handleNext}>
							Naprej
						</button>
					</>
				)}
			</div>
		</main>
	);
}

export default ListeningGame;
