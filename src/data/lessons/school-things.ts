import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const schoolThingsLesson: Lesson = {
	id: "school-things",
	level: 1,
	order: 300,
	title: "School things",
	titleSl: "Šolske potrebščine",
	icon: openmoji("1F392"),
	content: {
		wordIds: [
			"book",
			"pencil",
			"pen",
			"ruler",
			"rubber",
			"bag",
			"desk",
			"chair",
		],
		grammarHints: [
			{
				id: "school-things-this-is",
				titleSl: "What is this?",
				explanationSl:
					"Ko vprašamo, kaj je nekaj, uporabimo What is this? " +
					"Odgovor začnemo z It is ali This is.",
				rows: [
					{
						label: "Vprašanje",
						pattern: "What is this?",
						example: "What is this? It is a pencil.",
					},
					{
						label: "Odgovor",
						pattern: "This is …",
						example: "This is a book.",
					},
				],
			},
			{
				id: "school-things-a-an",
				titleSl: "a / an",
				explanationSl:
					"Pred stvarjo v ednini uporabimo a ali an. " +
					"A uporabimo pred soglasniškim glasom, " +
					"an pa pred samoglasniškim glasom.",
				rows: [
					{
						label: "Soglasniški glas",
						pattern: "a",
						example: "It is a ruler.",
					},
					{
						label: "Samoglasniški glas",
						pattern: "an",
						example: "It is an orange pencil.",
					},
				],
			},
		],
		grammar: [
			{
				id: "school-things-1",
				sentence: "What ___ this?",
				options: ["are", "am", "is"],
				correctAnswer: "is",
			},
			{
				id: "school-things-2",
				sentence: "It is ___ pencil.",
				options: ["an", "a", "two"],
				correctAnswer: "a",
			},
			{
				id: "school-things-3",
				sentence: "This ___ a book.",
				options: ["is", "are", "am"],
				correctAnswer: "is",
			},
			{
				id: "school-things-4",
				sentence: "It is ___ ruler.",
				options: ["two", "an", "a"],
				correctAnswer: "a",
			},
		],
	},
};
