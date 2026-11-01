import { Timestamp } from "firebase/firestore";
import type { GameResult, GameResults, GameType } from "../models/game";
import type { LessonProgress } from "../models/user";

const GAME_TYPES: readonly GameType[] = [
	"memory",
	"matching",
	"grammar",
	"listening",
];
const RESULT_KEYS = [
	"gameType",
	"totalItems",
	"rawIncorrectSubmissions",
	"firstAttemptErrorItems",
	"memoryMismatches",
	"firstTryCorrect",
];

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCount(value: unknown): value is number {
	return (
		typeof value === "number" && Number.isSafeInteger(value) && value >= 0
	);
}

export function parseGameResult(value: unknown): GameResult {
	if (
		!isRecord(value) ||
		Object.keys(value).length !== RESULT_KEYS.length ||
		!RESULT_KEYS.every((key) => Object.hasOwn(value, key)) ||
		!GAME_TYPES.includes(value.gameType as GameType) ||
		!isCount(value.totalItems) ||
		value.totalItems === 0 ||
		!isCount(value.rawIncorrectSubmissions) ||
		!isCount(value.firstAttemptErrorItems) ||
		!isCount(value.memoryMismatches)
	) {
		throw new Error("Invalid finished game result.");
	}
	if (value.gameType === "memory") {
		if (
			value.firstTryCorrect !== null ||
			value.rawIncorrectSubmissions !== 0 ||
			value.firstAttemptErrorItems !== 0
		) {
			throw new Error(
				"Memory cannot contain language errors or accuracy.",
			);
		}
		return {
			gameType: "memory",
			totalItems: value.totalItems,
			rawIncorrectSubmissions: 0,
			firstAttemptErrorItems: 0,
			memoryMismatches: value.memoryMismatches,
			firstTryCorrect: null,
		};
	}
	if (
		!isCount(value.firstTryCorrect) ||
		value.firstTryCorrect > value.totalItems ||
		value.firstAttemptErrorItems !==
			value.totalItems - value.firstTryCorrect ||
		value.rawIncorrectSubmissions < value.firstAttemptErrorItems ||
		(value.firstAttemptErrorItems === 0 &&
			value.rawIncorrectSubmissions !== 0) ||
		value.memoryMismatches !== 0
	) {
		throw new Error("Inconsistent finished game counts.");
	}
	return {
		gameType: value.gameType as Exclude<GameType, "memory">,
		totalItems: value.totalItems,
		firstTryCorrect: value.firstTryCorrect,
		rawIncorrectSubmissions: value.rawIncorrectSubmissions,
		firstAttemptErrorItems: value.firstAttemptErrorItems,
		memoryMismatches: 0,
	};
}

export function parseGameResults(value: unknown): GameResults {
	if (!isRecord(value) || Object.keys(value).length === 0) {
		throw new Error("Progress must contain finished games.");
	}
	const entries = Object.entries(value).map(([key, result]) => {
		const parsed = parseGameResult(result);
		if (parsed.gameType !== key)
			throw new Error("Game result key mismatch.");
		return [key, parsed];
	});
	return Object.fromEntries(entries) as GameResults;
}

function parseCompletionDate(value: unknown): string {
	if (value instanceof Timestamp) return value.toDate().toISOString();
	if (
		typeof value === "string" &&
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/.test(value) &&
		Number.isFinite(Date.parse(value)) &&
		new Date(value).toISOString().slice(0, 19) === value.slice(0, 19)
	) {
		return value;
	}
	throw new Error("Invalid lesson completion timestamp.");
}

export function parseLessonProgress(value: unknown): LessonProgress {
	if (
		!isRecord(value) ||
		Object.keys(value).some(
			(key) => !["stars", "games", "completedAt"].includes(key),
		) ||
		!isCount(value.stars) ||
		value.stars > 3
	) {
		throw new Error("Invalid lesson progress.");
	}
	const games = Object.hasOwn(value, "games")
		? parseGameResults(value.games)
		: undefined;
	if (value.stars === 0) {
		if (!games || Object.hasOwn(value, "completedAt")) {
			throw new Error(
				"Partial lessons require games and no completion timestamp.",
			);
		}
		return { stars: 0, games };
	}
	const completedAt = parseCompletionDate(value.completedAt);
	return {
		stars: value.stars as 1 | 2 | 3,
		completedAt,
		...(games ? { games } : {}),
	};
}
