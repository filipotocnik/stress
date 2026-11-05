import { createContext, useContext } from "react";
import type { GameResult } from "../models/game";
import type { User } from "../models/user";
import type { SaveGameResult } from "../services/progress";

export interface ProgressContextValue {
	user: User | null;
	loading: boolean;
	error: unknown;
	refresh: () => Promise<void>;
	saveGame: (
		lessonId: string,
		result: GameResult,
		attemptId?: string,
	) => Promise<SaveGameResult>;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export function useProgress() {
	const progress = useContext(ProgressContext);
	if (!progress) throw new Error("ProgressProvider is required.");
	return progress;
}
