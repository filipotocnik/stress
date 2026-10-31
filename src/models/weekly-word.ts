import type { Word } from "./word";

export interface WeeklyWord extends Word {
    order: number;  // number of the week
    exampleEn: string;
    exampleSl: string;
}