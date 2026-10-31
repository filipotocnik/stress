import { wordsById } from "../../data";
import { openmoji } from "../../data/images";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import "./LessonPage.css";

interface LessonPageProps {
	lesson: Lesson;
	number: number; // zaporedna številka lekcije na poti
}

// Tri igre, ki so enake za vse lekcije
const GAMES = [
	{
		id: "match",
		title: "Poveži besede",
		description: "Slovenska beseda ↔ angleška beseda",
		icon: openmoji("1F517"),
		color: "var(--sea-soft)",
	},
	{
		id: "memory",
		title: "Spomin",
		description: "Poišči par: slika + angleška beseda",
		icon: openmoji("1F0CF"),
		color: "var(--sun-soft)",
	},
	{
		id: "fill",
		title: "Dopolni stavek",
		description: "Izberi pravo besedo v stavku",
		icon: openmoji("270F"),
		color: "var(--leaf-soft)",
	},
];

// Brskalnik prebere besedo na glas
function speak(text: string) {
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "en-GB";
	speechSynthesis.cancel();
	speechSynthesis.speak(utterance);
}

// Prva stran lekcije: besede, pravila in izbira igre
function LessonPage({ lesson, number }: LessonPageProps) {
	// Besede poiščemo po id-ju, neznane id-je izpustimo
	const words = lesson.content.wordIds
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => word !== undefined);

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

			<section className="lesson__words" aria-label="Besede">
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
							className="word-card__say"
							onClick={() => speak(word.en)}
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
				<span>Za vsako vajo dobiš do 3 zvezdice</span>
			</div>

			<section className="lesson__games">
				{GAMES.map((game) => (
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
								aria-label="0 od 3 zvezdic"
							>
								{[1, 2, 3].map((n) => (
									<span key={n} aria-hidden="true">
										★
									</span>
								))}
							</span>
							{/* TODO: odpri igro, ko bo narejena */}
							<button className="game-card__play">Igraj</button>
						</div>
					</div>
				))}
			</section>
		</main>
	);
}

export default LessonPage;
