import "./Game.css";
import type { LessonStars } from "../../models/game";
import TobiBubble from "../mascot/TobiBubble";

interface GameResultProps {
	title: string;
	stars: LessonStars | null; // null = igra brez ocene (Spomin)
	firstTryCorrect: number | null;
	total: number;
	onReplay: () => void;
	onBack: () => void;
}

const MESSAGES: Record<LessonStars, string> = {
	1: "Dobro! Z vajo bo še bolje.",
	2: "Zelo dobro!",
	3: "Odlično!",
};

// Zaslon po koncu igre
function GameResult({
	title,
	stars,
	firstTryCorrect,
	total,
	onReplay,
	onBack,
}: GameResultProps) {
	return (
		<section className="game-result" aria-live="polite">
			<p className="game-result__eyebrow">{title}</p>
			<h1 className="game-result__title">Igra končana!</h1>

			{stars !== null && (
				<span
					className="game-result__stars"
					aria-label={`${stars} od 3 zvezdic`}
				>
					{[1, 2, 3].map((n) => (
						<span
							key={n}
							className={
								n <= stars
									? "game-result__star"
									: "game-result__star game-result__star--off"
							}
							aria-hidden="true"
						>
							★
						</span>
					))}
				</span>
			)}

			<div className="game-result__tobi">
				<TobiBubble
					mood={stars === 1 ? "happy" : "cheer"}
					message={
						stars === null ? "Našel si vse pare!" : MESSAGES[stars]
					}
				/>
			</div>
			{firstTryCorrect !== null && (
				<p className="game-result__score">
					Pravilni odgovori: {firstTryCorrect} / {total}
				</p>
			)}

			<div className="game-result__actions">
				<button className="game-result__replay" onClick={onReplay}>
					Igraj ponovno
				</button>
				<button className="game-result__back" onClick={onBack}>
					Nazaj na lekcijo
				</button>
			</div>
		</section>
	);
}

export default GameResult;
