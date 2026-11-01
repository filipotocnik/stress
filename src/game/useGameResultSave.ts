import { useCallback, useEffect, useRef, useState } from "react";
import type { GameResult } from "../models/game";
import type { SaveGameResult } from "../services/progress";

interface GameSaveState {
	status: "idle" | "saving" | "saved" | "error";
	savedResult: SaveGameResult | null;
	error: unknown;
}

export function useGameResultSave(
	result: GameResult,
	saveResult: (attempt: GameResult) => Promise<SaveGameResult>,
) {
	const [attemptResult] = useState<GameResult>(() => ({ ...result }));
	const [saveAttempt] = useState(() => saveResult);
	const [state, setState] = useState<GameSaveState>({
		status: "idle",
		savedResult: null,
		error: null,
	});
	const isMounted = useRef(true);
	const isSaved = useRef(false);
	const pendingSave = useRef<Promise<void> | null>(null);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	const save = useCallback((): Promise<void> => {
		if (!isMounted.current || isSaved.current) return Promise.resolve();
		if (pendingSave.current) return pendingSave.current;

		pendingSave.current = Promise.resolve()
			.then(() => saveAttempt(attemptResult))
			.then(
				(savedResult) => {
					isSaved.current = true;
					if (isMounted.current) {
						setState({ status: "saved", savedResult, error: null });
					}
				},
				(error: unknown) => {
					if (isMounted.current) {
						setState({ status: "error", savedResult: null, error });
					}
				},
			)
			.finally(() => {
				pendingSave.current = null;
			});
		setState({ status: "saving", savedResult: null, error: null });
		return pendingSave.current;
	}, [attemptResult, saveAttempt]);

	return { ...state, attemptResult, save, retry: save };
}
