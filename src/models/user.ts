// Zapis nastane šele, ko je lekcija končana
export interface LessonProgress {
  stars: 1 | 2 | 3;
  completedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string; // id iz AVATARS
  email: string;
  lessonProgress: Record<string, LessonProgress>;
}

export function getTotalStars(user: User): number {
  return Object.values(user.lessonProgress).reduce(
    (sum, progress) => sum + progress.stars,
    0,
  );
}

export function getCompletedCount(user: User): number {
  return Object.keys(user.lessonProgress).length;
}
