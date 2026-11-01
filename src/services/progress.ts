import { FirebaseError } from "firebase/app";
import {
	collection,
	doc,
	getDocFromServer,
	getDocsFromServer,
	runTransaction,
	serverTimestamp,
	snapshotEqual,
	type DocumentData,
	type DocumentSnapshot,
	type Firestore,
} from "firebase/firestore";
import { lessonsById } from "../data/lessons";
import { getLessonGrade } from "../game/progression";
import { getBestGameResult } from "../game/scoring";
import type { GameResult, GameResults } from "../models/game";
import type { LessonProgress } from "../models/user";
import { parseGameResult, parseLessonProgress } from "./progressValidation";

export interface SaveGameResult {
	attemptResult: GameResult;
	bestResult: GameResult;
	lessonStars: 0 | 1 | 2 | 3;
	lessonCompleted: boolean;
	newlyCompleted: boolean;
	xpGained: number;
}

export async function loadLessonProgress(
	db: Firestore,
	userId: string,
): Promise<Record<string, LessonProgress>> {
	const snapshot = await getDocsFromServer(
		collection(db, "users", userId, "progress"),
	);
	return Object.fromEntries(
		snapshot.docs.map((document) => [
			document.id,
			parseLessonProgress(document.data()),
		]),
	);
}

export async function saveFinishedGame(
	db: Firestore,
	userId: string,
	lessonId: string,
	result: GameResult,
): Promise<SaveGameResult> {
	if (!lessonsById.has(lessonId)) throw new Error("Unknown lesson.");
	const attemptResult = parseGameResult(result);
	const reference = doc(db, "users", userId, "progress", lessonId);
	for (let retry = 0; ; retry++) {
		let lastRead: DocumentSnapshot | undefined;
		try {
			return await runTransaction(db, async (transaction) => {
				const snapshot = await transaction.get(reference);
				lastRead = snapshot;
				const storedProgress = snapshot.data();
				const previous = snapshot.exists()
					? parseLessonProgress(storedProgress)
					: undefined;
				const previousBest = previous?.games?.[attemptResult.gameType];
				const bestResult = getBestGameResult(
					previousBest,
					attemptResult,
				);
				const games: GameResults = {
					...previous?.games,
					[attemptResult.gameType]: bestResult,
				};
				const grade = getLessonGrade(games, previous);
				const data: DocumentData = { stars: grade.stars, games };
				if (grade.isComplete) {
					data.completedAt =
						storedProgress?.completedAt ?? serverTimestamp();
				}
				if (
					!previous ||
					bestResult !== previousBest ||
					grade.stars !== previous.stars
				) {
					transaction.set(reference, data);
				}
				return {
					attemptResult,
					bestResult,
					lessonStars: grade.stars,
					lessonCompleted: grade.isComplete,
					newlyCompleted: grade.newlyCompleted,
					xpGained: grade.xpGained,
				};
			});
		} catch (error) {
			if (
				retry >= 4 ||
				!(error instanceof FirebaseError) ||
				error.code !== "permission-denied" ||
				!lastRead
			) {
				throw error;
			}
			const latest = await getDocFromServer(reference);
			if (snapshotEqual(latest, lastRead)) throw error;
		}
	}
}
