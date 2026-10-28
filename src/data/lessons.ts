// Podatki za Roadmap.
// Zaenkrat so "zapečeni" v kodi. Kasneje jih lahko beremo iz Firebase (Firestore).

// Status lekcije: končana, trenutna ali zaklenjena.
export type LessonStatus = "done" | "current" | "locked";

// "Tip" opisuje, kakšno obliko ima vsaka lekcija.
// TypeScript nas opozori, če kje pozabimo polje ali vpišemo napačen tip.
export interface Lesson {
  id: string; // enolična oznaka, npr. "animals"
  title: string; // angleški naslov
  titleSl: string; // slovenski prevod
  icon: string; // zaenkrat emoji, kasneje slika iz OpenMoji
  month: string; // mesec v šolskem letu
  status: LessonStatus;
  stars: number; // 0–3 zvezdice za končane lekcije
}

export const LESSONS: Lesson[] = [
  {
    id: "hello",
    title: "Hello!",
    titleSl: "Pozdravi",
    icon: "👋",
    month: "September",
    status: "done",
    stars: 3,
  },
  {
    id: "colours",
    title: "Colours",
    titleSl: "Barve",
    icon: "🎨",
    month: "September",
    status: "done",
    stars: 2,
  },
  {
    id: "numbers",
    title: "Numbers",
    titleSl: "Števila",
    icon: "🔢",
    month: "Oktober",
    status: "done",
    stars: 3,
  },
  {
    id: "family",
    title: "My family",
    titleSl: "Družina",
    icon: "👨‍👩‍👧",
    month: "Oktober",
    status: "done",
    stars: 1,
  },
  {
    id: "animals",
    title: "Animals",
    titleSl: "Živali",
    icon: "🐱",
    month: "November",
    status: "current",
    stars: 0,
  },
  {
    id: "food",
    title: "Food",
    titleSl: "Hrana",
    icon: "🍎",
    month: "November",
    status: "locked",
    stars: 0,
  },
  {
    id: "school",
    title: "At school",
    titleSl: "V šoli",
    icon: "🎒",
    month: "December",
    status: "locked",
    stars: 0,
  },
  {
    id: "winter",
    title: "Winter",
    titleSl: "Zima",
    icon: "⛄",
    month: "December",
    status: "locked",
    stars: 0,
  },
];