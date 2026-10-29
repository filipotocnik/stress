import type { Lesson } from "../models/lesson";
import { openmoji } from "./images";

export const lessons: Lesson[] = [
    {
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
    },

    {
        id: "numbers",
        level: 1,
        order: 200,
        title: "Numbers",
        titleSl: "Števila",
        icon: openmoji("1F522"),
        content: {
            wordIds: [
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
            ],
            grammar: [
                {
                    id: "numbers-1",
                    sentence: "I ___ eight.",
                    options: ["is", "am", "are"],
                    correctAnswer: "am",
                },
                {
                    id: "numbers-2",
                    sentence: "How old ___ you?",
                    options: ["are", "is", "am"],
                    correctAnswer: "are",
                },
                {
                    id: "numbers-3",
                    sentence: "I ___ seven years old.",
                    options: ["are", "is", "am"],
                    correctAnswer: "am",
                },
                {
                    id: "numbers-4",
                    sentence: "I ___ six.",
                    options: ["am", "are", "is"],
                    correctAnswer: "am",
                },
            ],
        },
    },

    {
        id: "school-things",
        level: 1,
        order: 300,
        title: "School things",
        titleSl: "Šolske potrebščine",
        icon: openmoji("1F392"),
        content: {
            wordIds: [
                "book",
                "pencil",
                "pen",
                "ruler",
                "rubber",
                "bag",
                "desk",
                "chair",
            ],
            grammar: [
                {
                    id: "school-things-1",
                    sentence: "What ___ this?",
                    options: ["are", "am", "is"],
                    correctAnswer: "is",
                },
                {
                    id: "school-things-2",
                    sentence: "It is ___ pencil.",
                    options: ["an", "a", "two"],
                    correctAnswer: "a",
                },
                {
                    id: "school-things-3",
                    sentence: "This ___ a book.",
                    options: ["is", "are", "am"],
                    correctAnswer: "is",
                },
                {
                    id: "school-things-4",
                    sentence: "It is ___ ruler.",
                    options: ["two", "an", "a"],
                    correctAnswer: "a",
                },
            ],
        },
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },

    {
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
    },
];

export const lessonsById = new Map<string, Lesson>(
    lessons.map((lesson) => [lesson.id, lesson]),
);