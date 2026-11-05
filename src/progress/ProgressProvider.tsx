import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react";
import type { User as AuthUser } from "firebase/auth";
import { loadUser } from "../auth/auth";
import { db } from "../firebase";
import type { GameResult } from "../models/game";
import type { User } from "../models/user";
import { saveFinishedGame } from "../services/progress";
import { ProgressContext } from "../hooks/useProgress";

interface ProgressProviderProps {
	user: AuthUser;
	children: ReactNode;
}

export function ProgressProvider({ user, children }: ProgressProviderProps) {
	return (
		<AccountProgressProvider key={user.uid} user={user}>
			{children}
		</AccountProgressProvider>
	);
}

function AccountProgressProvider({
	user: authUser,
	children,
}: ProgressProviderProps) {
	const [state, setState] = useState<{
		user: User | null;
		loading: boolean;
		error: unknown;
	}>({ user: null, loading: true, error: null });
	const isMounted = useRef(true);
	const refreshVersion = useRef(0);

	const refresh = useCallback(async () => {
		if (!isMounted.current) return;
		const currentVersion = ++refreshVersion.current;
		setState((previous) => ({ ...previous, loading: true, error: null }));
		try {
			const loadedUser = await loadUser(authUser);
			if (
				isMounted.current &&
				currentVersion === refreshVersion.current
			) {
				setState({ user: loadedUser, loading: false, error: null });
			}
		} catch (error) {
			if (
				isMounted.current &&
				currentVersion === refreshVersion.current
			) {
				setState((previous) => ({
					...previous,
					loading: false,
					error,
				}));
			}
		}
	}, [authUser]);

	useEffect(() => {
		isMounted.current = true;
		void refresh();
		return () => {
			isMounted.current = false;
		};
	}, [refresh]);

	const saveGame = useCallback(
		async (
			lessonId: string,
			result: GameResult,
			attemptId: string = crypto.randomUUID(),
		) => {
			if (!isMounted.current) {
				throw new Error("This account session has ended.");
			}
			const savedResult = await saveFinishedGame(
				db,
				authUser.uid,
				lessonId,
				result,
				attemptId,
			);
			if (isMounted.current) await refresh();
			return savedResult;
		},
		[authUser.uid, refresh],
	);

	const value = useMemo(
		() => ({ ...state, refresh, saveGame }),
		[state, refresh, saveGame],
	);
	return <ProgressContext value={value}>{children}</ProgressContext>;
}
