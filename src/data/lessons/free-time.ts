import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const freeTimeLesson: Lesson = {
    id: "free-time",
    level: 2,
    order: 800,
    title: "Free time",
    titleSl: "Prosti čas",
    icon: openmoji("26BD"),
    content: {
        wordIds: [
            "football",
            "basketball",
            "tennis",
            "swim",
            "run",
            "dance",
            "sing",
            "bike",
        ],
        grammarHints: [
            {
                id: "free-time-can",
                titleSl: "can / can't",
                explanationSl:
                    "Z I can povemo, kaj znamo ali zmoremo. " +
                    "Z I can't povemo, česa ne znamo ali ne zmoremo. " +
                    "Za can in can't uporabimo osnovno obliko glagola, " +
                    "brez -s ali -ing.",
                rows: [
                    {
                        label: "Znam / zmorem",
                        pattern: "I can + glagol",
                        example: "I can swim.",
                    },
                    {
                        label: "Ne znam / ne zmorem",
                        pattern: "I can't + glagol",
                        example: "I can't dance.",
                    },
                    {
                        label: "Šport",
                        pattern: "can play …",
                        example: "I can play football.",
                    },
                ],
            },
        ],
        grammar: [
            {
                id: "free-time-1",
                sentence: "I can ___.",
                options: ["swimming", "swims", "swim"],
                correctAnswer: "swim",
            },
            {
                id: "free-time-2",
                sentence: "I can't ___.",
                options: ["dance", "dances", "dancing"],
                correctAnswer: "dance",
            },
            {
                id: "free-time-3",
                sentence: "I can ___ football.",
                options: ["playing", "play", "plays"],
                correctAnswer: "play",
            },
            {
                id: "free-time-4",
                sentence: "I can't ___.",
                options: ["sings", "singing", "sing"],
                correctAnswer: "sing",
            },
        ],
    },
};