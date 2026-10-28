// Napredek pri eni lekciji. Zapis nastane šele, ko je lekcija končana.
export interface LessonProgress {
  stars: 1 | 2 | 3;
  completedAt: string; // ISO datum, npr. new Date().toISOString()
}

// Uporabnik, kot je shranjen v Firestore (users/{uid}).
export interface User {
  id: string; // uid iz Firebase Auth
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string; // id iz AVATARS, npr. "owl"
  email: string;
  lessonProgress: Record<string, LessonProgress>; // ključ = id lekcije, npr. "hello"
}

// Vse zvezdice, ki jih je uporabnik zbral v končanih lekcijah.
export function getTotalStars(user: User): number {
  return Object.values(user.lessonProgress).reduce(
    (sum, progress) => sum + progress.stars,
    0,
  );
}

// Število končanih lekcij.
export function getCompletedCount(user: User): number {
  return Object.keys(user.lessonProgress).length;
}
