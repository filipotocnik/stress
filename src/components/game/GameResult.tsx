import "./Game.css";

type GameStars = 0 | 1 | 2 | 3;

interface GameResultProps {
	title: string;
	stars: GameStars; // 0 = igra izgubljena
	mistakes: number;
	onReplay: () => void;
	onBack: () => void;
}

const MESSAGES: Record<GameStars, string> = {
	0: "Ostal si brez srčkov. Poskusi znova!",
	1: "Dobro! Z vajo bo še bolje.",
	2: "Zelo dobro!",
	3: "Odlično! Brez napake!",
};

// Zaslon po koncu igre
function GameResult({
	title,
	stars,
	mistakes,
	onReplay,
	onBack,
}: GameResultProps) {
	const lost = stars === 0;

	return (
		<section className="game-result" aria-live="polite">
			<p className="game-result__eyebrow">{title}</p>
			<h1 className="game-result__title">
				{lost ? "Konec igre" : "Igra končana!"}
			</h1>

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

			<p className="game-result__message">{MESSAGES[stars]}</p>
			<p className="game-result__mistakes">Napake: {mistakes}</p>

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
