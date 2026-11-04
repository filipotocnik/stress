import { useState } from "react";
import GameHeader from "../../components/game/GameHeader";
import GameResultSave from "../../components/game/GameResultSave";
import { useGameSession } from "../../hooks/useGameSession";
import { useFeedbackAudio } from "../../hooks/useFeedbackAudio";
import { useRecordedAudio } from "../../hooks/useRecordedAudio";
import type { Lesson } from "../../models/lesson";
import { getGrammarAudioId } from "../../utils/audio";
import "./FillGame.css";

interface FillGameProps {
	lesson: Lesson;
}

interface FillRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

function FillGame({ lesson }: FillGameProps) {
	const [round, setRound] = useState(0);

	return (
		<FillRound
			key={round}
			lesson={lesson}
			onReplay={() => setRound((r) => r + 1)}
		/>
	);
}

function FillRound({ lesson, onReplay }: FillRoundProps) {
	const questions = lesson.content.grammar;
	const { play, stop, error } = useRecordedAudio();
	const { play: playFeedback, stop: stopFeedback } = useFeedbackAudio();

	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "grammar",
		itemIds: questions.map((q) => q.id),
	});

	const [index, setIndex] = useState(0);
	const [picked, setPicked] = useState<string | null>(null);
	const [wrong, setWrong] = useState<string[]>([]);

	if (result !== null && index === questions.length) {
		return (
			<GameResultSave
				title="Dopolni stavek"
				className="fill"
				lessonId={lesson.id}
				result={result}
				onReplay={onReplay}
			/>
		);
	}

	const question = questions[index];
	const [before, after] = question.sentence.split("___");

	function handlePick(option: string) {
		if (picked !== null || wrong.includes(option)) return;
		const correct = option === question.correctAnswer;
		dispatch({ type: "answer", itemId: question.id, correct });
		if (correct) {
			setPicked(option);
			playFeedback(true, () =>
				play(getGrammarAudioId(lesson.id, question.id)),
			);
		} else {
			playFeedback(false);
			setWrong((prev) => [...prev, option]);
		}
	}

	function handleNext() {
		stopFeedback();
		stop();
		setIndex((i) => i + 1);
		setPicked(null);
		setWrong([]);
		playFeedback(index + 1 === questions.length ? "complete" : "next");
	}

	return (
		<main className="fill">
			<GameHeader
				title="Dopolni stavek"
				done={resolvedCount}
				total={totalCount}
			/>

			<p className="fill__sentence">
				{before}
				<span
					className={
						picked !== null
							? "fill__blank fill__blank--done"
							: "fill__blank"
					}
				>
					{picked ?? "?"}
				</span>
				{after}
			</p>

			<div className="fill__options">
				{question.options.map((option) => {
					const isWrong = wrong.includes(option);
					const isCorrect = picked === option;
					let className = "fill__option";
					if (isCorrect) className += " fill__option--correct";
					else if (isWrong) className += " fill__option--wrong";

					return (
						<button
							key={option}
							className={className}
							disabled={picked !== null || isWrong}
							onClick={() => handlePick(option)}
						>
							{option}
							{isWrong && " ✗"}
						</button>
					);
				})}
			</div>

			{error && (
				<div role="alert">
					<p>{error}</p>
					<button
						onClick={() => {
							stopFeedback();
							play(getGrammarAudioId(lesson.id, question.id));
						}}
					>
						Poslušaj znova
					</button>
				</div>
			)}

			<div className="fill__feedback" aria-live="polite">
				{picked !== null ? (
					<>
						<p className="fill__message fill__message--correct">
							✓ Pravilno!
						</p>
						<button className="start-button" onClick={handleNext}>
							Naprej
						</button>
					</>
				) : (
					wrong.length > 0 && (
						<p className="fill__message fill__message--wrong">
							✗ Skoraj! Poskusi še enkrat.
						</p>
					)
				)}
			</div>
		</main>
	);
}

export default FillGame;
