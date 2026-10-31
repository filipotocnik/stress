import { openmoji } from "../../data/images";
import type { GrammarHint } from "../../models/grammar";
import type { Word } from "../../models/word";
import "./LessonPage.css";

// TODO: začasni testni podatki, v 2. koraku jih zamenjamo z data/lessons
const LESSON = {
	title: "Wild animals",
	titleSl: "Divje živali",
	icon: openmoji("1F981"),
	levelSl: "Nivo 3",
	unitSl: "Lekcija 11",
};

const WORDS: Word[] = [
	{ id: "lion", en: "lion", sl: "lev", imageSrc: openmoji("1F981") },
	{ id: "bear", en: "bear", sl: "medved", imageSrc: openmoji("1F43B") },
	{ id: "wolf", en: "wolf", sl: "volk", imageSrc: openmoji("1F43A") },
	{ id: "snake", en: "snake", sl: "kača", imageSrc: openmoji("1F40D") },
	{ id: "eagle", en: "eagle", sl: "orel", imageSrc: openmoji("1F985") },
	{ id: "deer", en: "deer", sl: "jelen", imageSrc: openmoji("1F98C") },
	{ id: "horse", en: "horse", sl: "konj", imageSrc: openmoji("1F40E") },
	{ id: "swan", en: "swan", sl: "labod", imageSrc: openmoji("1F9A2") },
];

const GRAMMAR_HINTS: GrammarHint[] = [
	{
		id: "have-got",
		titleSl: "have got / has got",
		explanationSl: "Ko govorimo o tem, kaj kdo ima.",
		rows: [
			{
				label: "I, you, we, they",
				pattern: "have got",
				example: "I have got a dog.",
			},
			{
				label: "he, she, it",
				pattern: "has got",
				example: "She has got a cat.",
			},
		],
	},
];

// Tri igre, ki so enake za vse lekcije
const GAMES = [
	{
		id: "match",
		title: "Poveži besede",
		description: "Slovenska beseda ↔ angleška beseda",
		icon: "🔗",
		color: "var(--sea-soft)",
	},
	{
		id: "memory",
		title: "Spomin",
		description: "Poišči par: slika + angleška beseda",
		icon: "🃏",
		color: "var(--sun-soft)",
	},
	{
		id: "fill",
		title: "Dopolni stavek",
		description: "Izberi pravo besedo v stavku",
		icon: "✏️",
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
function LessonPage() {
	return (
		<main className="lesson">
			<header className="lesson__head">
				<img src={LESSON.icon} alt="" width={64} height={64} />
				<div>
					<p className="lesson__eyebrow">
						{LESSON.levelSl} · {LESSON.unitSl}
					</p>
					<h1 className="lesson__title">Lekcija: {LESSON.title}</h1>
					<p className="lesson__subtitle">
						{LESSON.titleSl} · preglej besede, nato reši vaje
					</p>
				</div>
			</header>

			<section className="lesson__words" aria-label="Besede">
				{WORDS.map((word) => (
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
							🔊
						</button>
					</div>
				))}
			</section>

			{/* Nekatere lekcije nimajo pravil */}
			{GRAMMAR_HINTS.map((hint) => (
				<section key={hint.id} className="lesson__rule">
					<span className="lesson__rule-icon" aria-hidden="true">
						💡
					</span>
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
							aria-hidden="true"
						>
							{game.icon}
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
