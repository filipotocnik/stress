import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResult from "../../components/game/GameResult";
import { openmoji } from "../../data/images";
import {
	createListeningQuestions,
	getListeningWords,
} from "../../game/listening";
import { getGameStars } from "../../game/scoring";
import { useGameResultSave } from "../../game/useGameResultSave";
import { useGameSession } from "../../game/useGameSession";
import { useFeedbackAudio } from "../../hooks/useFeedbackAudio";
import { useWordAudio } from "../../hooks/useWordAudio";
import type { GameResult as GameResultData } from "../../models/game";
import type { Lesson } from "../../models/lesson";
import { useProgress } from "../../progress/useProgress";
import "./ListeningGame.css";

interface ListeningGameProps {
	lesson: Lesson;
}

interface ListeningRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

interface ListeningSaveProps {
	lessonId: string;
	result: GameResultData;
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
	const [index, setIndex] = useState(0);
	const [picked, setPicked] = useState<string | null>(null);
	const [wrong, setWrong] = useState<string[]>([]);
	const submissions = useRef(new Set<string>());
	const solved = useRef(false);
	const soundButton = useRef<HTMLButtonElement>(null);

	if (result !== null && index === questions.length) {
		return (
			<ListeningSave
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
		<main className="listening">
			<GameHeader
				title="Poslušaj"
				done={resolvedCount}
				total={totalCount}
			/>

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
							width={40}
							height={40}
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
								width={112}
								height={112}
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

			<div className="listening__feedback" aria-live="polite">
				{picked !== null ? (
					<>
						<p className="listening__message listening__message--correct">
							✓ Pravilno!{" "}
							<strong lang="en">{question.word.en}</strong>
						</p>
						<button
							className="listening__next"
							onClick={handleNext}
						>
							Naprej
						</button>
					</>
				) : wrong.length > 0 ? (
					<p className="listening__message listening__message--wrong">
						✗ Skoraj! Poskusi še enkrat.
					</p>
				) : null}
			</div>
		</main>
	);
}

function ListeningSave({ lessonId, result, onReplay }: ListeningSaveProps) {
	const navigate = useNavigate();
	const { saveGame } = useProgress();
	const { status, save, retry } = useGameResultSave(result, (attempt) =>
		saveGame(lessonId, attempt),
	);

	useEffect(() => {
		void save();
	}, [save]);

	return (
		<main className="listening">
			<GameResult
				title="Poslušaj"
				stars={getGameStars(result)}
				firstTryCorrect={result.firstTryCorrect}
				total={result.totalItems}
				onReplay={onReplay}
				onBack={() => navigate(`/lekcija/${lessonId}`)}
			/>
			{status === "saving" && (
				<p className="listening__status" role="status">
					Shranjevanje rezultata…
				</p>
			)}
			{status === "error" && (
				<>
					<p className="auth-error" role="alert">
						Rezultata ni bilo mogoče shraniti.
					</p>
					<button
						className="listening__retry"
						onClick={() => void retry()}
					>
						Poskusi znova
					</button>
				</>
			)}
		</main>
	);
}

export default ListeningGame;
