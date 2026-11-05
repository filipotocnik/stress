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
import { getGameShells } from "../game/rewards";
import type { GameResult, GameResults } from "../models/game";
import type { LessonProgress } from "../models/user";
import { parseGameResult, parseLessonProgress } from "./progressValidation";

export interface SaveGameResult {
	attemptResult: GameResult;
	bestResult: GameResult;
	lessonStars: 0 | 1 | 2 | 3;
	lessonCompleted: boolean;
	newlyCompleted: boolean;
	shellsGained: number;
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
	attemptId: string,
): Promise<SaveGameResult> {
	if (!lessonsById.has(lessonId)) throw new Error("Unknown lesson.");
	if (!attemptId || attemptId.includes("/"))
		throw new Error("Invalid attempt ID.");
	const attemptResult = parseGameResult(result);
	const reference = doc(db, "users", userId, "progress", lessonId);
	const userReference = doc(db, "users", userId);
	const receiptReference = doc(db, "users", userId, "attempts", attemptId);
	for (let retry = 0; ; retry++) {
		let lastRead: DocumentSnapshot | undefined;
		try {
			return await runTransaction(db, async (transaction) => {
				const receipt = await transaction.get(receiptReference);
				if (receipt.exists()) {
					const saved = receipt.data();
					if (
						saved.lessonId !== lessonId ||
						JSON.stringify(
							parseGameResult(saved.result.attemptResult),
						) !== JSON.stringify(attemptResult)
					) {
						throw new Error("Attempt ID already used.");
					}
					return saved.result as SaveGameResult;
				}
				const userSnapshot = await transaction.get(userReference);
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
				const shellsGained = getGameShells(attemptResult, previousBest);
				const savedResult: SaveGameResult = {
					attemptResult,
					bestResult,
					lessonStars: grade.stars,
					lessonCompleted: grade.isComplete,
					newlyCompleted: grade.newlyCompleted,
					shellsGained,
				};
				transaction.set(
					userReference,
					{
						shells:
							(userSnapshot.data()?.shells ?? 0) + shellsGained,
					},
					{ merge: true },
				);
				transaction.set(receiptReference, {
					lessonId,
					result: savedResult,
				});
				return savedResult;
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
			if ((await getDocFromServer(receiptReference)).exists()) continue;
			const latest = await getDocFromServer(reference);
			if (snapshotEqual(latest, lastRead)) throw error;
		}
	}
}
