import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const wildAnimalsLesson: Lesson = {
    id: "wild-animals",
    level: 3,
    order: 1100,
    title: "Wild animals",
    titleSl: "Divje živali",
    icon: openmoji("1F981"),
    content: {
        wordIds: [
            "lion",
            "bear",
            "wolf",
            "snake",
            "eagle",
            "deer",
            "horse",
            "swan",
        ],
        grammarHints: [
            {
                id: "wild-animals-has-got",
                titleSl: "Has it got …?",
                explanationSl:
                    "Z Has it got vprašamo, ali ima žival nekaj. " +
                    "Kratko odgovorimo z Yes, it has ali No, it hasn't.",
                rows: [
                    {
                        label: "Vprašanje",
                        pattern: "Has it got …?",
                        example: "Has it got a tail?",
                    },
                    {
                        label: "Da",
                        pattern: "Yes, it has.",
                        example: "Has it got legs? Yes, it has.",
                    },
                    {
                        label: "Ne",
                        pattern: "No, it hasn't.",
                        example: "Has it got legs? No, it hasn't.",
                    },
                ],
            },
            {
                id: "wild-animals-can",
                titleSl: "Can it …?",
                explanationSl:
                    "Z Can it vprašamo, kaj žival zmore. " +
                    "Za it uporabimo osnovno obliko glagola, brez -s ali -ing. " +
                    "Kratko odgovorimo z Yes, it can ali No, it can't.",
                rows: [
                    {
                        label: "Vprašanje",
                        pattern: "Can it + glagol?",
                        example: "Can it fly?",
                    },
                    {
                        label: "Da",
                        pattern: "Yes, it can.",
                        example: "Can it swim? Yes, it can.",
                    },
                    {
                        label: "Ne",
                        pattern: "No, it can't.",
                        example: "Can it fly? No, it can't.",
                    },
                ],
            },
        ],
        grammar: [
            {
                id: "wild-animals-1",
                sentence: "___ it got a tail?",
                options: ["Have", "Has", "Does"],
                correctAnswer: "Has",
            },
            {
                id: "wild-animals-2",
                sentence: "Can it ___?",
                options: ["fly", "flies", "flying"],
                correctAnswer: "fly",
            },
            {
                id: "wild-animals-3",
                sentence: "Can it fly? No, it ___.",
                options: ["doesn't", "isn't", "can't"],
                correctAnswer: "can't",
            },
            {
                id: "wild-animals-4",
                sentence: "Has it got legs? Yes, it ___.",
                options: ["have", "has", "is"],
                correctAnswer: "has",
            },
        ],
    },
};