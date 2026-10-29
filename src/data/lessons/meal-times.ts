import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const mealTimesLesson: Lesson = {
	id: "meal-times",
	level: 3,
	order: 1000,
	title: "Meal times",
	titleSl: "Obroki",
	icon: openmoji("1F37D"),
	content: {
		wordIds: [
			"breakfast",
			"lunch",
			"dinner",
			"cereal",
			"honey",
			"biscuits",
			"bacon",
			"blueberries",
		],
		grammarHints: [
			{
				id: "meal-times-have",
				titleSl: "What do you have for …?",
				explanationSl:
					"Tako vprašamo, kaj nekdo običajno je za določen obrok. " +
					"Odgovor začnemo z I have. " +
					"Pred imenom obroka uporabimo for.",
				rows: [
					{
						label: "Vprašanje",
						pattern: "What do you have for …?",
						example: "What do you have for breakfast?",
					},
					{
						label: "Odgovor",
						pattern: "I have … for …",
						example: "I have cereal for breakfast.",
					},
				],
			},
			{
				id: "meal-times-clock",
				titleSl: "It's … o'clock",
				explanationSl:
					"Ko povemo, koliko je ura, uporabimo It is ali krajše It's. " +
					"Za polno uro za številom dodamo o'clock.",
				rows: [
					{
						label: "Daljša oblika",
						pattern: "It is … o'clock.",
						example: "It is eight o'clock.",
					},
					{
						label: "Krajša oblika",
						pattern: "It's … o'clock.",
						example: "It's seven o'clock.",
					},
				],
			},
		],
		grammar: [
			{
				id: "meal-times-1",
				sentence: "What ___ you have for breakfast?",
				options: ["does", "are", "do"],
				correctAnswer: "do",
			},
			{
				id: "meal-times-2",
				sentence: "I ___ cereal for breakfast.",
				options: ["have", "has", "having"],
				correctAnswer: "have",
			},
			{
				id: "meal-times-3",
				sentence: "It ___ eight o'clock.",
				options: ["are", "is", "am"],
				correctAnswer: "is",
			},
			{
				id: "meal-times-4",
				sentence: "It's seven ___.",
				options: ["clocks", "clock", "o'clock"],
				correctAnswer: "o'clock",
			},
		],
	},
};
