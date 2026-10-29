import type { GrammarHint, GrammarPractice } from "./grammar";

export type LevelId = 1 | 2 | 3;

export interface Level {
    id: LevelId;
    titleSl: string;
    descriptionSl: string;
}

export interface LessonContent {
    wordIds: string[];  // list of eight words
    grammarHints: GrammarHint[]; // short explanation before the lesson, can be empty
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