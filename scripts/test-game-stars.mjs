import assert from "node:assert/strict";
import { test } from "node:test";
import { getBestGameResult, getGameStars } from "../src/game/scoring.ts";

function scoredResult(gameType, firstTryCorrect, totalItems = 100) {
	return {
		gameType,
		firstTryCorrect,
		totalItems,
		firstAttemptErrorItems: totalItems - firstTryCorrect,
		rawIncorrectSubmissions: totalItems - firstTryCorrect,
		memoryMismatches: 0,
	};
}

for (const gameType of ["matching", "grammar", "listening"]) {
	for (const [correct, stars] of [
		[0, 1],
		[69, 1],
		[70, 2],
		[89, 2],
		[90, 3],
		[100, 3],
	]) {
		test(`${gameType}: ${correct}% earns ${stars} stars`, () => {
			const result = scoredResult(gameType, correct);
			assert.equal(getGameStars(result), stars);
			assert.equal("stars" in result, false);
		});
	}
}

test("memory has no stars, regardless of mismatches", () => {
	for (const memoryMismatches of [0, 20, 100]) {
		assert.equal(
			getGameStars({
				gameType: "memory",
				totalItems: 8,
				firstTryCorrect: null,
				firstAttemptErrorItems: 0,
				rawIncorrectSubmissions: 0,
				memoryMismatches,
			}),
			null,
		);
	}
});

test("saved best stars do not drop after a worse replay", () => {
	const best = scoredResult("matching", 90);
	const replay = scoredResult("matching", 50);
	assert.equal(getGameStars(replay), 1);
	assert.equal(getGameStars(getBestGameResult(best, replay)), 3);
	assert.equal(
		getGameStars(getBestGameResult(replay, scoredResult("matching", 70))),
		2,
	);
});

test("grading uses unrounded accuracy", () => {
	assert.equal(getGameStars(scoredResult("grammar", 6999, 10000)), 1);
	assert.equal(getGameStars(scoredResult("grammar", 8999, 10000)), 2);
});

test("invalid scores are rejected rather than given display stars", () => {
	for (const [correct, total] of [
		[0, 0],
		[-1, 10],
		[11, 10],
		[0.5, 10],
		[NaN, 10],
	]) {
		assert.throws(() =>
			getGameStars(scoredResult("listening", correct, total)),
		);
	}
});
