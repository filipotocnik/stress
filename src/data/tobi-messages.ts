import type { Lesson } from "../models/lesson";

interface RoadmapMessageData {
	name?: string; // ime otroka, ko je profil naložen
	lesson?: Lesson; // naslednja lekcija
}

// Sporočilo vrne null, če zanj nimamo potrebnih podatkov
type RoadmapMessage = (data: RoadmapMessageData) => string | null;

// Novo sporočilo = nov vnos v seznamu
const ROADMAP_MESSAGES: RoadmapMessage[] = [
	() => "Hi! Let's learn!",
	() => "Ready for new words?",
	({ name }) => (name ? `Hi, ${name}! Veselim se učenja s tabo!` : null),
	({ name, lesson }) =>
		name && lesson
			? `Hi, ${name}! Naslednja postaja: ${lesson.title}. Greva?`
			: null,
	({ lesson }) =>
		lesson ? `Naslednja postaja: ${lesson.title}. Greva?` : null,
];

// Ko so vse lekcije končane
const ALL_DONE_MESSAGES: RoadmapMessage[] = [
	() => "Wow! Vse lekcije so končane!",
	({ name }) => (name ? `Bravo, ${name}! Vse lekcije so končane!` : null),
];

// choice je naključno število med 0 in 1, ki ga komponenta izbere enkrat.
// Tako sporočilo ostane enako, tudi ko se stran znova izriše.
export function pickRoadmapMessage(
	choice: number,
	allDone: boolean,
	data: RoadmapMessageData,
): string {
	const messages = (allDone ? ALL_DONE_MESSAGES : ROADMAP_MESSAGES)
		.map((message) => message(data))
		.filter((message) => message !== null);
	return messages[Math.floor(choice * messages.length)];
}
