export type LevelId = 1 | 2 | 3;

export interface Level {
    id: LevelId;
    titleSl: string;
    descriptionSl: string;
}

export interface GrammarPractice {
    id: string;
    sentence: string;   // with exactly one ___ marker
    options: string[];  // words to choose from
    correctAnswer: string;  // must match exactly one of the words
}

export interface LessonContent {
    wordIds: string[];  // list of eight words
    grammar: GrammarPractice[]; // one or more grammar exercises
}

export interface Lesson {
    id: string;
    level: LevelId;
    order: number;

    title: string;
    titleSl: string;

    icon: string;
    content: LessonContent;
}