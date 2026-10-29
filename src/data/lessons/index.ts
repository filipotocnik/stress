import type { Lesson } from "../../models/lesson";

import { coloursLesson } from "./colours";
import { numbersLesson } from "./numbers";
import { schoolThingsLesson } from "./school-things";
import { clothesLesson } from "./clothes";
import { myFamilyLesson } from "./my-family";
import { myBodyLesson } from "./my-body";
import { foodLesson } from "./food";
import { freeTimeLesson } from "./free-time";
import { schoolDayLesson } from "./school-day";
import { mealTimesLesson } from "./meal-times";
import { wildAnimalsLesson } from "./wild-animals";
import { monthsAndFestivalsLesson } from "./months-and-festivals";

export const lessons: Lesson[] = [
    coloursLesson,
    numbersLesson,
    schoolThingsLesson,
    clothesLesson,
    myFamilyLesson,
    myBodyLesson,
    foodLesson,
    freeTimeLesson,
    schoolDayLesson,
    mealTimesLesson,
    wildAnimalsLesson,
    monthsAndFestivalsLesson,
];

export const lessonsById = new Map<string, Lesson>(
    lessons.map((lesson) => [lesson.id, lesson]),
);