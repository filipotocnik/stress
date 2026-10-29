import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const schoolDayLesson: Lesson = {
    id: "school-day",
    level: 3,
    order: 900,
    title: "School day",
    titleSl: "Šolski dan",
    icon: openmoji("1F3EB"),
    content: {
        wordIds: [
            "maths",
            "english",
            "music",
            "art",
            "pe",
            "science",
            "history",
            "geography",
        ],
        grammarHints: [
            {
                id: "school-day-do-you-like",
                titleSl: "Do you like …?",
                explanationSl:
                    "Z Do you like vprašamo, ali je nekomu nekaj všeč. " +
                    "Kratko odgovorimo z Yes, I do ali No, I don't.",
                rows: [
                    {
                        label: "Vprašanje",
                        pattern: "Do you like …?",
                        example: "Do you like Maths?",
                    },
                    {
                        label: "Da",
                        pattern: "Yes, I do.",
                        example: "Do you like Music? Yes, I do.",
                    },
                    {
                        label: "Ne",
                        pattern: "No, I don't.",
                        example: "Do you like Art? No, I don't.",
                    },
                ],
            },
            {
                id: "school-day-when-on",
                titleSl: "When is …? / on",
                explanationSl:
                    "Z When is vprašamo, kdaj je določen predmet na urniku. " +
                    "Pred dnevi v tednu uporabimo on.",
                rows: [
                    {
                        label: "Vprašanje",
                        pattern: "When is …?",
                        example: "When is English?",
                    },
                    {
                        label: "Dan v tednu",
                        pattern: "on + dan",
                        example: "Maths is on Monday.",
                    },
                ],
            },
        ],
        grammar: [
            {
                id: "school-day-1",
                sentence: "___ you like Maths?",
                options: ["Does", "Do", "Is"],
                correctAnswer: "Do",
            },
            {
                id: "school-day-2",
                sentence: "Do you like Music? Yes, I ___.",
                options: ["do", "does", "am"],
                correctAnswer: "do",
            },
            {
                id: "school-day-3",
                sentence: "Maths is ___ Monday.",
                options: ["in", "at", "on"],
                correctAnswer: "on",
            },
            {
                id: "school-day-4",
                sentence: "When ___ English?",
                options: ["are", "is", "am"],
                correctAnswer: "is",
            },
        ],
    },
};