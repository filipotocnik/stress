import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const monthsAndFestivalsLesson: Lesson = {
	id: "months-and-festivals",
	level: 3,
	order: 1200,
	title: "Months and festivals",
	titleSl: "Meseci in prazniki",
	icon: openmoji("1F384"),
	content: {
		wordIds: [
			"pumpkin",
			"ghost",
			"witch",
			"bat",
			"christmas-tree",
			"present",
			"easter-egg",
			"rabbit",
		],
		grammarHints: [
			{
				id: "months-and-festivals-in",
				titleSl: "in + mesec",
				explanationSl:
					"Ko povemo, v katerem mesecu je praznik, " +
					"pred mesecem uporabimo in. " +
					"V teh povedih za imenom praznika uporabimo is.",
				rows: [
					{
						label: "Oktober",
						pattern: "is in October",
						example: "Halloween is in October.",
					},
					{
						label: "December",
						pattern: "is in December",
						example: "Christmas is in December.",
					},
					{
						label: "Marec ali april",
						pattern: "is in March or April",
						example: "Easter is in March or April.",
					},
				],
			},
		],
		grammar: [
			{
				id: "months-and-festivals-1",
				sentence: "Halloween is ___ October.",
				options: ["on", "in", "at"],
				correctAnswer: "in",
			},
			{
				id: "months-and-festivals-2",
				sentence: "Christmas ___ in December.",
				options: ["is", "are", "am"],
				correctAnswer: "is",
			},
			{
				id: "months-and-festivals-3",
				sentence: "Easter is ___ March or April.",
				options: ["at", "on", "in"],
				correctAnswer: "in",
			},
			{
				id: "months-and-festivals-4",
				sentence: "Halloween ___ in October.",
				options: ["are", "is", "am"],
				correctAnswer: "is",
			},
		],
	},
};
