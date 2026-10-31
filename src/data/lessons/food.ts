import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const foodLesson: Lesson = {
	id: "food",
	level: 2,
	order: 700,
	title: "Food",
	titleSl: "Hrana",
	icon: openmoji("1F34E"),
	content: {
		wordIds: [
			"apple",
			"banana",
			"bread",
			"milk",
			"cheese",
			"egg",
			"cake",
			"carrot",
		],
		grammarHints: [
			{
				id: "food-like",
				titleSl: "I like / I don't like",
				explanationSl:
					"Z I like povemo, kaj nam je všeč. " +
					"Z I don't like povemo, kaj nam ni všeč. " +
					"V obeh primerih uporabimo like, ne likes.",
				rows: [
					{
						label: "Všeč mi je",
						pattern: "I like …",
						example: "I like apples.",
					},
					{
						label: "Ni mi všeč",
						pattern: "I don't like …",
						example: "I don't like cheese.",
					},
				],
			},
		],
		grammar: [
			{
				id: "food-1",
				sentence: "I ___ apples.",
				options: ["likes", "like", "liking"],
				correctAnswer: "like",
			},
			{
				id: "food-2",
				sentence: "I ___ like cheese.",
				options: ["don't", "doesn't", "isn't"],
				correctAnswer: "don't",
			},
			{
				id: "food-3",
				sentence: "I don't ___ carrots.",
				options: ["likes", "liking", "like"],
				correctAnswer: "like",
			},
			{
				id: "food-4",
				sentence: "I ___ bananas.",
				options: ["liking", "like", "likes"],
				correctAnswer: "like",
			},
		],
	},
};
