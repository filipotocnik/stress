import "./Game.css";
import type { LessonStars } from "../../models/game";

interface GameResultProps {
	title: string;
	stars: LessonStars | null;
	firstTryCorrect: number | null;
	total: number;
	turns?: number;
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
	turns,
	onReplay,
	onBack,
}: GameResultProps) {
	const isMemory = turns !== undefined;

	return (
		<section className="game-result" aria-live="polite">
			<p className="game-result__eyebrow">{title}</p>
			<h1 className="game-result__title">Igra končana!</h1>

			{isMemory ? (
				<dl className="game-result__turns">
					<dt>Število potez</dt>
					<dd>{turns}</dd>
				</dl>
			) : (
				stars !== null && (
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
				)
			)}

			<p className="game-result__message">
				{isMemory
					? "Našel si vse pare!"
					: stars !== null
						? MESSAGES[stars]
						: "Igra končana!"}
			</p>

			{!isMemory && firstTryCorrect !== null && (
				<p className="game-result__score">
					Pravilni odgovori: {firstTryCorrect} / {total}
				</p>
			)}

			<div className="game-result__actions">
				<button
					type="button"
					className="game-result__replay"
					onClick={onReplay}
				>
					Igraj ponovno
				</button>
				<button
					type="button"
					className="game-result__back"
					onClick={onBack}
				>
					Nazaj na lekcijo
				</button>
			</div>
		</section>
	);
}

export default GameResult;