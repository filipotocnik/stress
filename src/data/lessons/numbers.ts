import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const numbersLesson: Lesson = {
	id: "numbers",
	level: 1,
	order: 200,
	title: "Numbers",
	titleSl: "Števila",
	icon: openmoji("1F522"),
	content: {
		wordIds: [
			"one",
			"two",
			"three",
			"four",
			"five",
			"six",
			"seven",
			"eight",
		],
		grammarHints: [
			{
				id: "numbers-age",
				titleSl: "Koliko si star?",
				explanationSl:
					"Po starosti vprašamo z How old are you? " +
					"Odgovor začnemo z I am. Dodamo lahko tudi years old.",
				rows: [
					{
						label: "Vprašanje",
						pattern: "How old are you?",
						example: "How old are you? I am eight.",
					},
					{
						label: "Kratek odgovor",
						pattern: "I am …",
						example: "I am six.",
					},
					{
						label: "Daljši odgovor",
						pattern: "I am … years old.",
						example: "I am seven years old.",
					},
				],
			},
		],
		grammar: [
			{
				id: "numbers-1",
				sentence: "I ___ eight.",
				options: ["is", "am", "are"],
				correctAnswer: "am",
			},
			{
				id: "numbers-2",
				sentence: "How old ___ you?",
				options: ["are", "is", "am"],
				correctAnswer: "are",
			},
			{
				id: "numbers-3",
				sentence: "I ___ seven years old.",
				options: ["are", "is", "am"],
				correctAnswer: "am",
			},
			{
				id: "numbers-4",
				sentence: "I ___ six.",
				options: ["am", "are", "is"],
				correctAnswer: "am",
			},
		],
	},
};
