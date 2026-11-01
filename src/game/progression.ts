import {
	REQUIRED_GAMES,
	type GameResults,
	type GameType,
} from "../models/game";
import type { Lesson } from "../models/lesson";
import { isLessonCompleted, type LessonProgress } from "../models/user";
import { getGameAccuracy, getStarsForAccuracy, getTotalXp } from "./scoring";

export function getLessonGrade(
	games: GameResults,
	previous?: LessonProgress,
	requiredGames: readonly GameType[] = REQUIRED_GAMES,
) {
	if (
		requiredGames.length === 0 ||
		new Set(requiredGames).size !== requiredGames.length ||
		!requiredGames.some((game) => game !== "memory")
	) {
		throw new Error("Require unique games and at least one scored game.");
	}
	const allRequiredFinished = requiredGames.every(
		(game) => games[game] !== undefined,
	);
	const accuracies = requiredGames.flatMap((game) => {
		const result = games[game];
		if (!result) return [];
		if (result.gameType !== game)
			throw new Error("Game result key mismatch.");
		const accuracy = getGameAccuracy(result);
		return accuracy === null ? [] : [accuracy];
	});
	const accuracy = allRequiredFinished
		? accuracies.reduce((sum, value) => sum + value, 0) / accuracies.length
		: null;
	const earnedStars = accuracy === null ? 0 : getStarsForAccuracy(accuracy);
	const previousStars = previous?.stars ?? 0;
	const stars = previousStars > earnedStars ? previousStars : earnedStars;
	return {
		isComplete: stars > 0,
		allRequiredFinished,
		accuracy,
		stars,
		newlyCompleted: previousStars === 0 && stars > 0,
		xpGained: getTotalXp(stars - previousStars),
	};
}

export function getLessonAvailability(
	lessons: readonly Lesson[],
	progress: Readonly<Record<string, LessonProgress>>,
	lessonId: string,
): "locked" | "current" | "done" {
	const ordered = [...lessons].sort(
		(a, b) => a.level - b.level || a.order - b.order,
	);
	const index = ordered.findIndex((lesson) => lesson.id === lessonId);
	if (index < 0) return "locked";
	if (isLessonCompleted(progress[lessonId])) return "done";
	return index === 0 || isLessonCompleted(progress[ordered[index - 1].id])
		? "current"
		: "locked";
}
