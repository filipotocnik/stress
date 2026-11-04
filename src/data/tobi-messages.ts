import type { TobiMood } from "../components/mascot/Tobi";
import type { Lesson } from "../models/lesson";
import type { Word } from "../models/word";

interface RoadmapMessageData {
	name?: string; // ime otroka, ko je profil naložen
	lesson?: Lesson; // naslednja lekcija
	word?: Word; // naključna beseda iz naslednje lekcije
}

interface RoadmapMessage {
	mood: TobiMood;
	// Besedilo je null, če zanj nimamo potrebnih podatkov
	text: (data: RoadmapMessageData) => string | null;
}

// Novo sporočilo = nov vnos v seznamu, z razpoloženjem, ki se ujema z besedilom
const ROADMAP_MESSAGES: RoadmapMessage[] = [
	{ mood: "encourage", text: () => "Hi! Let's learn!" },
	{ mood: "encourage", text: () => "Ready for new words?" },
	{
		mood: "happy",
		text: ({ name }) =>
			name ? `Hi, ${name}! Veselim se učenja s tabo!` : null,
	},
	{
		mood: "encourage",
		text: ({ name, lesson }) =>
			name && lesson
				? `Hi, ${name}! Naslednja postaja: ${lesson.title}. Greva?`
				: null,
	},
	{
		mood: "encourage",
		text: ({ lesson }) =>
			lesson ? `Naslednja postaja: ${lesson.title}. Greva?` : null,
	},
	{
		mood: "think",
		text: ({ word }) =>
			word
				? `Hm ... kako se po angleško reče »${word.sl}«? Greva pogledat!`
				: null,
	},
];

// Ko so vse lekcije končane
const ALL_DONE_MESSAGES: RoadmapMessage[] = [
	{ mood: "cheer", text: () => "Wow! Vse lekcije so končane!" },
	{
		mood: "cheer",
		text: ({ name }) =>
			name ? `Bravo, ${name}! Vse lekcije so končane!` : null,
	},
];

// choice je naključno število med 0 in 1, ki ga komponenta izbere enkrat.
// Tako sporočilo ostane enako, tudi ko se stran znova izriše.
export function pickRoadmapMessage(
	choice: number,
	allDone: boolean,
	data: RoadmapMessageData,
): { mood: TobiMood; message: string } {
	const messages = (allDone ? ALL_DONE_MESSAGES : ROADMAP_MESSAGES).flatMap(
		({ mood, text }) => {
			const message = text(data);
			return message === null ? [] : [{ mood, message }];
		},
	);
	return messages[Math.floor(choice * messages.length)];
}

export type GameEvent = "start" | "correct" | "streak" | "wrong";

// Sporočila med igro. Tobi nikoli ne kritizira, ob napaki samo spodbuja.
const GAME_MESSAGES: Record<GameEvent, string[]> = {
	start: ["Let's go!", "Ti to zmoreš!"],
	correct: ["Yes!", "Pravilno!", "Well done!"],
	streak: ["Great! Odlično ti gre!", "Super! Kar tako naprej!"],
	wrong: ["Skoraj! Poskusi še enkrat.", "Almost! Še en poskus."],
};

// Naključno sporočilo, ki ni enako prejšnjemu
export function pickGameMessage(event: GameEvent, previous?: string): string {
	const all = GAME_MESSAGES[event];
	const others = all.filter((message) => message !== previous);
	const messages = others.length > 0 ? others : all;
	return messages[Math.floor(Math.random() * messages.length)];
}
