import type { GameResults, LessonStars } from "./game";

export type LessonProgress =
	| { stars: 0; completedAt?: never; games: GameResults }
	| { stars: LessonStars; completedAt: string; games?: GameResults };

export function isLessonCompleted(
	progress: LessonProgress | undefined,
): boolean {
	return progress !== undefined && progress.stars > 0;
}

// Shranjeno v users/{uid}
export interface UserProfile {
	firstName: string;
	lastName: string;
	displayName: string;
	avatar: string; // id iz AVATARS
}

export interface User extends UserProfile {
	id: string;
	email: string;
	lessonProgress: Record<string, LessonProgress>;
}

export function getTotalStars(user: Pick<User, "lessonProgress">): number {
	return Object.values(user.lessonProgress).reduce(
		(sum, progress) => sum + progress.stars,
		0,
	);
}

export function getCompletedCount(user: User): number {
	return Object.values(user.lessonProgress).filter(isLessonCompleted).length;
}
