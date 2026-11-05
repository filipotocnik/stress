import "./Game.css";

interface GameHeaderProps {
	title: string;
	done: number; // rešene naloge
	total: number;
}

// Vrstica nad igro: naslov in napredek
function GameHeader({ title, done, total }: GameHeaderProps) {
	const percent = total > 0 ? Math.round((done / total) * 100) : 0;

	return (
		<header className="game-header">
			<div className="game-header__heading">
				<h1 className="game-header__title">{title}</h1>
				<p className="game-header__count" aria-live="polite">
					{done} / {total}
				</p>
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
		</header>
	);
}

export default GameHeader;
