interface GameHeaderProps {
	title: string;
	done: number; // rešene naloge
	total: number;
	lives?: number; // preostali srčki, brez tega se ne pokažejo (npr. Spomin)
	maxLives?: number;
}

// Vrstica nad igro: naslov, napredek in srčki.
// Samo prikaz
function GameHeader({
	title,
	done,
	total,
	lives,
	maxLives = 3,
}: GameHeaderProps) {
	const percent = total > 0 ? Math.round((done / total) * 100) : 0;

	return (
		<header className="game-header">
			<div className="game-header__top">
				<h1 className="game-header__title">{title}</h1>
				{lives !== undefined && (
					<span
						className="game-header__hearts"
						aria-label={`${lives} od ${maxLives} srčkov`}
					>
						{Array.from({ length: maxLives }, (_, i) => (
							<span key={i} aria-hidden="true">
								{i < lives ? "❤️" : "💔"}
							</span>
						))}
					</span>
				)}
			</div>

			<div
				className="game-header__progress"
				role="progressbar"
				aria-valuemin={0}
				aria-valuemax={total}
				aria-valuenow={done}
				aria-label="Napredek"
			>
				<div
					className="game-header__bar"
					style={{ width: `${percent}%` }}
				/>
			</div>
			<p className="game-header__count">
				{done}/{total}
			</p>
		</header>
	);
}

export default GameHeader;
