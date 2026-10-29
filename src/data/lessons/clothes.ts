import type { Lesson } from "../../models/lesson";
import { openmoji } from "../images";

export const clothesLesson: Lesson = {
    id: "clothes",
    level: 1,
    order: 400,
    title: "Clothes",
    titleSl: "Oblačila",
    icon: openmoji("1F455"),
    content: {
        wordIds: [
            "t-shirt",
            "dress",
            "skirt",
            "trousers",
            "shoes",
            "socks",
            "hat",
            "jacket",
        ],
        grammarHints: [
            {
                id: "clothes-is-are",
                titleSl: "is / are",
                explanationSl:
                    "Za eno oblačilo uporabimo is, za več oblačil pa are. " +
                    "Beseda trousers je v angleščini množinska, zato tudi z njo uporabimo are.",
                rows: [
                    {
                        label: "Eno oblačilo",
                        pattern: "is",
                        example: "My hat is blue.",
                    },
                    {
                        label: "Več oblačil",
                        pattern: "are",
                        example: "My shoes are black.",
                    },
                    {
                        label: "Hlače",
                        pattern: "trousers are",
                        example: "My trousers are black.",
                    },
                ],
            },
        ],
        grammar: [
            {
                id: "clothes-1",
                sentence: "My hat ___ blue.",
                options: ["are", "is", "am"],
                correctAnswer: "is",
            },
            {
                id: "clothes-2",
                sentence: "My shoes ___ black.",
                options: ["are", "am", "is"],
                correctAnswer: "are",
            },
            {
                id: "clothes-3",
                sentence: "My T-shirt ___ yellow.",
                options: ["am", "are", "is"],
                correctAnswer: "is",
            },
            {
                id: "clothes-4",
                sentence: "My socks ___ white.",
                options: ["is", "are", "am"],
                correctAnswer: "are",
            },
        ],
    },
};