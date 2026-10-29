import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const myBodyLesson: Lesson = {
	id: "my-body",
	level: 2,
	order: 600,
	title: "My body",
	titleSl: "Moje telo",
	icon: openmoji("270B"),
	content: {
		wordIds: [
			"head",
			"eyes",
			"ears",
			"nose",
			"mouth",
			"hair",
			"hand",
			"leg",
		],
		grammarHints: [
			{
				id: "my-body-have-has",
				titleSl: "have got / has got",
				explanationSl:
					"Ko govorimo o tem, kaj kdo ima, uporabimo have got " +
					"ali has got. Izbira je odvisna od tega, o kom govorimo.",
				rows: [
					{
						label: "I, you, we, they",
						pattern: "have got",
						example: "I have got blue eyes.",
					},
					{
						label: "he, she, it",
						pattern: "has got",
						example: "She has got long hair.",
					},
				],
			},
		],
		grammar: [
			{
				id: "my-body-1",
				sentence: "I ___ got blue eyes.",
				options: ["have", "has", "am"],
				correctAnswer: "have",
			},
			{
				id: "my-body-2",
				sentence: "She ___ got long hair.",
				options: ["have", "is", "has"],
				correctAnswer: "has",
			},
			{
				id: "my-body-3",
				sentence: "He ___ got green eyes.",
				options: ["have", "has", "are"],
				correctAnswer: "has",
			},
			{
				id: "my-body-4",
				sentence: "You ___ got two ears.",
				options: ["has", "are", "have"],
				correctAnswer: "have",
			},
		],
	},
};
