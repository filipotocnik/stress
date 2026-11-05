import { useReducer } from "react";
import type { GameSessionInput } from "../models/game";
import {
	createGameSession,
	gameSessionReducer,
	getSessionSummary,
} from "../game/session";

export function useGameSession(input: GameSessionInput) {
	const [state, dispatch] = useReducer(
		gameSessionReducer,
		input,
		createGameSession,
	);
	return { ...getSessionSummary(state), dispatch };
}
