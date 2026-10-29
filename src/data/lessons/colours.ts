import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const coloursLesson: Lesson = {
	id: "colours",
	level: 1,
	order: 100,
	title: "Colours",
	titleSl: "Barve",
	icon: openmoji("1F3A8"),
	content: {
		wordIds: [
			"red",
			"blue",
			"green",
			"yellow",
			"orange",
			"purple",
			"black",
			"white",
		],
		grammarHints: [
			{
				id: "colours-it-is",
				titleSl: "It is …",
				explanationSl:
					"Ko povemo, kakšne barve je nekaj, uporabimo It is. " +
					"Po barvi vprašamo z What colour is it?",
				rows: [
					{
						label: "Poved",
						pattern: "It is …",
						example: "It is red.",
					},
					{
						label: "Vprašanje",
						pattern: "What colour is it?",
						example: "What colour is it? It is blue.",
					},
				],
			},
		],
		grammar: [
			{
				id: "colours-1",
				sentence: "It ___ red.",
				options: ["are", "is", "am"],
				correctAnswer: "is",
			},
			{
				id: "colours-2",
				sentence: "What colour ___ it?",
				options: ["is", "am", "are"],
				correctAnswer: "is",
			},
			{
				id: "colours-3",
				sentence: "It ___ blue.",
				options: ["am", "are", "is"],
				correctAnswer: "is",
			},
			{
				id: "colours-4",
				sentence: "It ___ green.",
				options: ["is", "are", "am"],
				correctAnswer: "is",
			},
		],
	},
};
