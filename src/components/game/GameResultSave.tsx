import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getGameStars } from "../../game/scoring";
import { useGameResultSave } from "../../hooks/useGameResultSave";
import type { GameResult as GameResultData } from "../../models/game";
import { useProgress } from "../../hooks/useProgress";
import GameResult from "./GameResult";

interface GameResultSaveProps {
	title: string;
	className: string;
	lessonId: string;
	result: GameResultData;
	onReplay: () => void;
}

function GameResultSave({
	title,
	className,
	lessonId,
	result,
	onReplay,
}: GameResultSaveProps) {
	const navigate = useNavigate();
	const { saveGame } = useProgress();
	const { status, save, retry } = useGameResultSave(result, (attempt) =>
		saveGame(lessonId, attempt),
	);

	useEffect(() => {
		void save();
	}, [save]);

	return (
		<main className={`game-screen ${className}`}>
			<GameResult
				title={title}
				stars={getGameStars(result)}
				firstTryCorrect={result.firstTryCorrect}
				total={result.totalItems}
				turns={
					result.gameType === "memory"
						? result.totalItems + result.memoryMismatches
						: undefined
				}
				onReplay={onReplay}
				onBack={() => navigate(`/lekcija/${lessonId}`)}
			/>
			{status === "saving" && (
				<p className="game-save-status" role="status">
					Shranjevanje rezultata…
				</p>
			)}
			{status === "error" && (
				<div className="game-save-error">
					<p className="auth-error" role="alert">
						Rezultata ni bilo mogoče shraniti.
					</p>
					<button
						type="button"
						data-ui-sound
						className="game-retry"
						onClick={() => void retry()}
					>
						Poskusi znova
					</button>
				</div>
			)}
		</main>
	);
}

export default GameResultSave;
