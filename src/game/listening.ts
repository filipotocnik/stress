import { wordsById } from "../data";
import type { Lesson } from "../models/lesson";
import type { Word } from "../models/word";

export interface ListeningQuestion {
	word: Word;
	options: Word[];
}

export function getListeningWords(lesson: Lesson) {
	return [...new Set(lesson.content.wordIds)]
		.map((id) => wordsById.get(id))
		.filter((word): word is Word => Boolean(word?.imageSrc?.trim()));
}

function shuffle<T>(items: T[]) {
	const result = [...items];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export function createListeningQuestions(lesson: Lesson): ListeningQuestion[] {
	const words = getListeningWords(lesson);
	if (words.length < 2) return [];

	return shuffle(words).map((word) => ({
		word,
		options: shuffle([
			word,
			...shuffle(words.filter((option) => option.id !== word.id)).slice(
				0,
				3,
			),
		]),
	}));
}
