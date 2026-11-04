import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResult from "../../components/game/GameResult";
import TobiBubble from "../../components/mascot/TobiBubble";
import { useTobiReaction } from "../../game/useTobiReaction";
import { getGameStars } from "../../game/scoring";
import { useGameResultSave } from "../../game/useGameResultSave";
import { useGameSession } from "../../game/useGameSession";
import type { GameResult as GameResultData } from "../../models/game";
import type { Lesson } from "../../models/lesson";
import { useProgress } from "../../progress/useProgress";
import { speak } from "../../utils/speech";
import "./FillGame.css";

interface FillGameProps {
	lesson: Lesson;
}

interface FillRoundProps {
	lesson: Lesson;
	onReplay: () => void;
}

interface FillSaveProps {
	lessonId: string;
	result: GameResultData;
	onReplay: () => void;
}

// Igra: izberi pravo besedo, ki manjka v stavku
// hrani številko kroga. S spremembo key se ustvari nov FillRound
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

// stavki po vrsti, na koncu rezultat
function FillRound({ lesson, onReplay }: FillRoundProps) {
	const questions = lesson.content.grammar;

	const { resolvedCount, totalCount, result, dispatch } = useGameSession({
		gameType: "grammar",
		itemIds: questions.map((q) => q.id),
	});

	const tobi = useTobiReaction();

	// lokalno stanje prikaza
	const [index, setIndex] = useState(0);
	const [picked, setPicked] = useState<string | null>(null);
	const [wrong, setWrong] = useState<string[]>([]);

	// Rezultat pokažemo šele po »Naprej« pri zadnjem stavku,
	// da otrok vidi še pravilno dopolnjen stavek
	if (result !== null && index === questions.length) {
		return (
			<FillSave
				lessonId={lesson.id}
				result={result}
				onReplay={onReplay}
			/>
		);
	}

	const question = questions[index];
	const [before, after] = question.sentence.split("___");

	function handlePick(option: string) {
		const correct = option === question.correctAnswer;
		dispatch({ type: "answer", itemId: question.id, correct });
		tobi.onAnswer(correct);

		if (correct) {
			setPicked(option);
			speak(`${before}${option}${after}`);
		} else {
			setWrong((prev) => [...prev, option]);
		}
	}

	// Premaknemo se na naslednji stavek in počistimo prikaz prejšnjega
	function handleNext() {
		setIndex((i) => i + 1);
		setPicked(null);
		setWrong([]);
	}

	return (
		<main className="fill">
			<GameHeader
				title="Dopolni stavek"
				done={resolvedCount}
				total={totalCount}
			/>

			<div className="game-tobi">
				<TobiBubble mood={tobi.mood} message={tobi.message} />
			</div>

			<p className="fill__count">
				Stavek {index + 1} od {questions.length}
			</p>

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

			<div className="fill__feedback">
				{picked !== null && (
					<button className="start-button" onClick={handleNext}>
						Naprej
					</button>
				)}
			</div>
		</main>
	);
}

// Rezultat kroga, ki se ob prikazu shrani v napredek
function FillSave({ lessonId, result, onReplay }: FillSaveProps) {
	const navigate = useNavigate();
	const { saveGame } = useProgress();
	const { status, save, retry } = useGameResultSave(result, (attempt) =>
		saveGame(lessonId, attempt),
	);

	useEffect(() => {
		void save();
	}, [save]);

	return (
		<main className="fill">
			<GameResult
				title="Dopolni stavek"
				stars={getGameStars(result)}
				firstTryCorrect={result.firstTryCorrect}
				total={result.totalItems}
				onReplay={onReplay}
				onBack={() => navigate(`/lekcija/${lessonId}`)}
			/>

			{status === "saving" && (
				<p className="fill__status" role="status">
					Shranjevanje rezultata…
				</p>
			)}
			{status === "error" && (
				<>
					<p className="auth-error" role="alert">
						Rezultata ni bilo mogoče shraniti.
					</p>
					<button
						className="fill__retry"
						onClick={() => void retry()}
					>
						Poskusi znova
					</button>
				</>
			)}
		</main>
	);
}

export default FillGame;
