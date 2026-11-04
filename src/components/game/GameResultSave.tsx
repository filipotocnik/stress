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
		<main className={className}>
			<GameResult
				title={title}
				stars={getGameStars(result)}
				firstTryCorrect={result.firstTryCorrect}
				total={result.totalItems}
				onReplay={onReplay}
				onBack={() => navigate(`/lekcija/${lessonId}`)}
			/>
			{status === "saving" && (
				<p className={`${className}__status`} role="status">
					Shranjevanje rezultata…
				</p>
			)}
			{status === "error" && (
				<>
					<p className="auth-error" role="alert">
						Rezultata ni bilo mogoče shraniti.
					</p>
					<button
						className={`${className}__retry`}
						onClick={() => void retry()}
					>
						Poskusi znova
					</button>
				</>
			)}
		</main>
	);
}

export default GameResultSave;
