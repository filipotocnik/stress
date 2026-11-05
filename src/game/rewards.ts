import type { GameResult } from "../models/game";
import { getGameStars } from "./scoring";

const SHELLS_PER_STAR = 5;
const MEMORY_SHELLS = 10;
const REPLAY_SHELLS = 3;

function getCompletionShells(result: GameResult): number {
	const stars = getGameStars(result);
	return stars === null ? MEMORY_SHELLS : stars * SHELLS_PER_STAR;
}

export function getGameShells(
	attempt: GameResult,
	previous?: GameResult,
): number {
	const reward = getCompletionShells(attempt);
	if (!previous) return reward;
	if (previous.gameType !== attempt.gameType) {
		throw new Error("Cannot compare different games.");
	}
	return REPLAY_SHELLS + Math.max(0, reward - getCompletionShells(previous));
}
