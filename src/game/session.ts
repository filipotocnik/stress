import type {
	GameResult,
	GameSessionAction,
	GameSessionInput,
	GameType,
} from "../models/game";

interface SessionItem {
	readonly id: string;
	readonly resolved: boolean;
	readonly hadError: boolean;
}

export interface GameSessionState {
	readonly gameType: GameType;
	readonly items: readonly SessionItem[];
	readonly rawIncorrectSubmissions: number;
	readonly memoryMismatches: number;
}

export function createGameSession(input: GameSessionInput): GameSessionState {
	if (
		input.itemIds.length === 0 ||
		input.itemIds.some((id) => !id.trim()) ||
		new Set(input.itemIds).size !== input.itemIds.length
	) {
		throw new Error("A session requires nonempty, unique item IDs.");
	}
	return {
		gameType: input.gameType,
		items: input.itemIds.map((id) => ({
			id,
			resolved: false,
			hadError: false,
		})),
		rawIncorrectSubmissions: 0,
		memoryMismatches: 0,
	};
}

export function gameSessionReducer(
	state: GameSessionState,
	action: GameSessionAction,
): GameSessionState {
	if (state.items.every((item) => item.resolved)) return state;

	if (action.type === "memory-mismatch") {
		return state.gameType === "memory"
			? { ...state, memoryMismatches: state.memoryMismatches + 1 }
			: state;
	}
	if (state.gameType === "memory" && action.type !== "resolve-pair") {
		return state;
	}
	if (state.gameType !== "memory" && action.type !== "answer") {
		return state;
	}
	const target = state.items.find((item) => item.id === action.itemId);
	if (!target || target.resolved) return state;

	const correct = action.type === "resolve-pair" || action.correct;
	return {
		...state,
		items: state.items.map((item) =>
			item === target
				? {
						...item,
						resolved: correct,
						hadError: item.hadError || !correct,
					}
				: item,
		),
		rawIncorrectSubmissions:
			state.rawIncorrectSubmissions + (correct ? 0 : 1),
	};
}

export function getSessionSummary(state: GameSessionState) {
	const totalCount = state.items.length;
	const resolvedCount = state.items.filter((item) => item.resolved).length;
	const firstAttemptErrorItems = state.items.filter(
		(item) => item.hadError,
	).length;
	const firstTryCorrect = state.items.filter(
		(item) => item.resolved && !item.hadError,
	).length;
	const isComplete = totalCount > 0 && resolvedCount === totalCount;
	const counts = {
		totalItems: totalCount,
		rawIncorrectSubmissions: state.rawIncorrectSubmissions,
		firstAttemptErrorItems,
		memoryMismatches: state.memoryMismatches,
	};
	const attempt: GameResult =
		state.gameType === "memory"
			? { ...counts, gameType: state.gameType, firstTryCorrect: null }
			: { ...counts, gameType: state.gameType, firstTryCorrect };
	return {
		resolvedCount,
		totalCount,
		progress: totalCount === 0 ? 0 : resolvedCount / totalCount,
		isComplete,
		...counts,
		firstTryCorrect: attempt.firstTryCorrect,
		result: isComplete ? attempt : null,
	};
}
