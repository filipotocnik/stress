import type { GameResult, LessonStars } from "../models/game";

export function getGameAccuracy(result: GameResult): number | null {
	if (!Number.isInteger(result.totalItems) || result.totalItems <= 0) {
		throw new Error("A finished game must contain items.");
	}
	if (result.gameType === "memory") return null;
	if (
		!Number.isInteger(result.firstTryCorrect) ||
		result.firstTryCorrect < 0 ||
		result.firstTryCorrect > result.totalItems
	) {
		throw new Error("Invalid first-try count.");
	}
	return result.firstTryCorrect / result.totalItems;
}

export function getStarsForAccuracy(accuracy: number): LessonStars {
	if (!Number.isFinite(accuracy) || accuracy < 0 || accuracy > 1) {
		throw new Error("Accuracy must be between zero and one.");
	}
	if (accuracy >= 0.9 - Number.EPSILON) return 3;
	if (accuracy >= 0.7 - Number.EPSILON) return 2;
	return 1;
}

// Derive display stars from a finished attempt or saved best result.
// Memory has no accuracy grade and must not display stars.
export function getGameStars(result: GameResult): LessonStars | null {
	const accuracy = getGameAccuracy(result);
	return accuracy === null ? null : getStarsForAccuracy(accuracy);
}

export function getBestGameResult(
	previous: GameResult | undefined,
	attempt: GameResult,
): GameResult {
	const accuracy = getGameAccuracy(attempt);
	if (!previous) return attempt;
	if (previous.gameType !== attempt.gameType) {
		throw new Error("Cannot compare different games.");
	}
	const previousAccuracy = getGameAccuracy(previous);
	return accuracy !== null &&
		previousAccuracy !== null &&
		accuracy > previousAccuracy
		? attempt
		: previous;
}

export function getTotalXp(totalStars: number): number {
	if (!Number.isInteger(totalStars) || totalStars < 0) {
		throw new Error("Total stars must be a nonnegative integer.");
	}
	return 10 * totalStars;
}

export function getUserLevel(totalXp: number): number {
	if (!Number.isFinite(totalXp) || totalXp < 0) {
		throw new Error("XP must be nonnegative.");
	}
	return 1 + Math.floor(totalXp / 100);
}
