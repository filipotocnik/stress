export type GameType = "memory" | "matching" | "grammar" | "listening";
export type ScoredGameType = Exclude<GameType, "memory">;
export type LessonStars = 1 | 2 | 3;

export const REQUIRED_GAMES: readonly GameType[] = [
	"memory",
	"matching",
	"grammar",
];

interface FinishedGame {
	totalItems: number;
	rawIncorrectSubmissions: number;
	firstAttemptErrorItems: number;
	memoryMismatches: number;
}

export type GameResult = FinishedGame &
	(
		| { gameType: "memory"; firstTryCorrect: null }
		| { gameType: ScoredGameType; firstTryCorrect: number }
	);

export type GameResults = {
	[Game in GameType]?: GameResult & { gameType: Game };
};

export interface GameSessionInput {
	gameType: GameType;
	itemIds: readonly string[];
}

export type GameSessionAction =
	| { type: "answer"; itemId: string; correct: boolean }
	| { type: "resolve-pair"; itemId: string }
	| { type: "memory-mismatch" };
