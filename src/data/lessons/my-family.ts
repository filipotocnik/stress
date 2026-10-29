import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const myFamilyLesson: Lesson = {
    id: "my-family",
    level: 2,
    order: 500,
    title: "My family",
    titleSl: "Moja družina",
    icon: openmoji("1F46A"),
    content: {
        wordIds: [
            "mum",
            "dad",
            "sister",
            "brother",
            "grandma",
            "grandpa",
            "baby",
            "family",
        ],
        grammarHints: [
            {
                id: "my-family-have-got",
                titleSl: "I have got / I've got",
                explanationSl:
                    "Ko povemo, koga imamo v družini, uporabimo I have got. " +
                    "I've got je krajša oblika z enakim pomenom.",
                rows: [
                    {
                        label: "Daljša oblika",
                        pattern: "I have got …",
                        example: "I have got a sister.",
                    },
                    {
                        label: "Krajša oblika",
                        pattern: "I've got …",
                        example: "I've got a brother.",
                    },
                ],
            },
            {
                id: "my-family-one-more",
                titleSl: "a sister / two sisters",
                explanationSl:
                    "Za eno sestro ali enega brata uporabimo a. " +
                    "Za več uporabimo število in množino. " +
                    "Pri besedah sister in brother množino tvorimo z -s.",
                rows: [
                    {
                        label: "Ena oseba",
                        pattern: "a sister",
                        example: "I've got a sister.",
                    },
                    {
                        label: "Več oseb",
                        pattern: "two brothers",
                        example: "I have got two brothers.",
                    },
                ],
            },
        ],
        grammar: [
            {
                id: "my-family-1",
                sentence: "I ___ got a sister.",
                options: ["has", "is", "have"],
                correctAnswer: "have",
            },
            {
                id: "my-family-2",
                sentence: "I've ___ a brother.",
                options: ["got", "get", "getting"],
                correctAnswer: "got",
            },
            {
                id: "my-family-3",
                sentence: "I ___ got two brothers.",
                options: ["has", "have", "am"],
                correctAnswer: "have",
            },
            {
                id: "my-family-4",
                sentence: "I've got ___ sister.",
                options: ["an", "two", "a"],
                correctAnswer: "a",
            },
        ],
    },
};