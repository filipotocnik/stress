import type { CSSProperties } from "react";
import { useNavigate } from "react-router";
import { wordsById } from "../../data";
import { openmoji } from "../../data/images";
import { getGameStars } from "../../game/scoring";
import { useWordAudio } from "../../hooks/useWordAudio";
import type { GameType } from "../../models/game";
import type { Lesson } from "../../models/lesson";
import type { LessonProgress } from "../../models/user";
import type { Word } from "../../models/word";
import "./LessonPage.css";

interface LessonPageProps {
	lesson: Lesson;
	number: number; // zaporedna številka lekcije na poti
	progress?: LessonProgress;
}

// Štiri igre, ki so enake za vse lekcije
const GAMES: {
	id: GameType;
	title: string;
	description: string;
	icon: string;
	color: string;
}[] = [
	{
		id: "matching",
		title: "Poveži besede",
		description: "Slovenska beseda ↔ angleška beseda",
		icon: openmoji("1F517"),
		color: "var(--sea-soft)",
	},
	{
		id: "grammar",
		title: "Dopolni stavek",
		description: "Izberi pravo besedo v stavku",
		icon: openmoji("270F"),
		color: "var(--leaf-soft)",
	},
	{
		id: "listening",
		title: "Poslušaj",
		description: "Poslušaj besedo in izberi pravo sliko",
		icon: openmoji("1F442"),
		color: "var(--sea-soft)",
	},
	{
		id: "memory",
		title: "Spomin",
		description: "Poišči par: slika + angleška beseda",
		icon: openmoji("1F0CF"),
		color: "var(--sun-soft)",
	},
];

// Največ kartic besed v eni vrsti
const MAX_COLUMNS = 5;

// Prva stran lekcije: besede, pravila in izbira igre
function LessonPage({ lesson, number, progress }: LessonPageProps) {
	const navigate = useNavigate();

	// Besede poiščemo po id-ju, neznane id-je izpustimo
	const words = lesson.content.wordIds
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => word !== undefined);

	const { play, playingWordId, error } = useWordAudio();

	// Čim manj vrst, kartice pa enakomerno razdelimo (8 → 4 + 4, 10 → 5 + 5)
	const rows = Math.ceil(words.length / MAX_COLUMNS);
	const columns = Math.max(1, Math.ceil(words.length / rows));

	return (
		<main className="lesson">
			<header className="lesson__head">
				<img src={lesson.icon} alt="" width={64} height={64} />
				<div>
					<p className="lesson__eyebrow">
						Nivo {lesson.level} · Lekcija {number}
					</p>
					<h1 className="lesson__title">Lekcija: {lesson.title}</h1>
					<p className="lesson__subtitle">
						{lesson.titleSl} · preglej besede, nato reši vaje
					</p>
				</div>
			</header>

			<section
				className="lesson__words"
				aria-label="Besede"
				style={{ "--columns": columns } as CSSProperties}
			>
				{words.map((word) => (
					<div key={word.id} className="word-card">
						{word.imageSrc && (
							<img
								src={word.imageSrc}
								alt=""
								width={64}
								height={64}
							/>
						)}
						<span className="word-card__en">{word.en}</span>
						<span className="word-card__sl">{word.sl}</span>
						<button
							className={
								playingWordId === word.id
									? "word-card__say word-card__say--playing"
									: "word-card__say"
							}
							onClick={() => play(word)}
							aria-label={`Poslušaj: ${word.en}`}
						>
							<img
								src={openmoji("1F50A")}
								alt=""
								width={28}
								height={28}
							/>
						</button>
					</div>
				))}
			</section>

			{error && (
				<p className="lesson__audio-error" role="alert">
					{error}
				</p>
			)}

			{/* Nekatere lekcije nimajo pravil */}
			{lesson.content.grammarHints.map((hint) => (
				<section key={hint.id} className="lesson__rule">
					<img
						src={openmoji("1F4A1")}
						alt=""
						width={48}
						height={48}
					/>
					<div>
						<h2 className="lesson__rule-title">
							Pravilo lekcije: {hint.titleSl}
						</h2>
						<p className="lesson__rule-text">
							{hint.explanationSl}
						</p>
						{hint.rows && (
							<table className="lesson__rule-table">
								<tbody>
									{hint.rows.map((row) => (
										<tr key={row.pattern}>
											<td>{row.label}</td>
											<td>
												<b>{row.pattern}</b>
											</td>
											<td className="lesson__rule-example">
												{row.example}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</section>
			))}

			<div className="lesson__section-title">
				<h2>Vaje</h2>
				<span>Pri vajah z ocenjevanjem dobiš do 3 zvezdice</span>
			</div>

			<section className="lesson__games">
				{GAMES.map((game) => {
					const result = progress?.games?.[game.id];
					const stars =
						game.id === "memory"
							? null
							: result
								? getGameStars(result)
								: 0;
					return (
						<div key={game.id} className="game-card">
							<span
								className="game-card__icon"
								style={{ background: game.color }}
							>
								<img
									src={game.icon}
									alt=""
									width={40}
									height={40}
								/>
							</span>
							<h3 className="game-card__title">{game.title}</h3>
							<p className="game-card__description">
								{game.description}
							</p>
							<div className="game-card__meta">
								<span
									className="game-card__stars"
									aria-label={
										stars === null
											? undefined
											: `${stars} od 3 zvezdic`
									}
								>
									{stars !== null &&
										[1, 2, 3].map((n) => (
											<span
												key={n}
												aria-hidden="true"
												className={
													n <= stars
														? "game-card__star--earned"
														: undefined
												}
											>
												★
											</span>
										))}
								</span>
								<button
									className="game-card__play"
									data-ui-sound
									onClick={() =>
										navigate(
											`/lekcija/${lesson.id}/igra/${game.id}`,
										)
									}
								>
									Igraj
								</button>
							</div>
						</div>
					);
				})}
			</section>
		</main>
	);
}

export default LessonPage;
