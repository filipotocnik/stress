import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import GameHeader from "../../components/game/GameHeader";
import GameResult from "../../components/game/GameResult";
import { wordsById } from "../../data";
import { openmoji } from "../../data/images";
import { useGameResultSave } from "../../game/useGameResultSave";
import { useGameSession } from "../../game/useGameSession";
import type { GameResult as GameResultData } from "../../models/game";
import type { Lesson } from "../../models/lesson";
import type { Word } from "../../models/word";
import { useProgress } from "../../progress/useProgress";
import { speak } from "../../utils/speech";
import "./MemoryGame.css";


interface MemoryGameProps {
    lesson: Lesson;
}

interface MemoryRoundProps {
    lesson: Lesson;
    onReplay: () => void;
}

type MemoryResultData = Extract<GameResultData, { gameType: "memory" }>;

interface MemorySaveProps {
    lessonId: string;
    result: MemoryResultData;
    onReplay: () => void;
}

interface MemoryCard {
    id: string;
    kind: "en" | "image";
    word: Word;
}

const MISMATCH_DELAY = 1000;
const FINISH_DELAY = 1200;
const CARD_BACK_IMAGE = openmoji("2754");

// Vrne nov, naključno premešan seznam
function shuffle<T>(items: readonly T[]): T[] {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

// Nov key ob ponovni igri ponastavi stanje in premeša kartice
function MemoryGame({ lesson }: MemoryGameProps) {
    const [round, setRound] = useState(0);

    if (!lesson.content.wordIds.some((id) => wordsById.has(id))) {
        return <Navigate to={`/lekcija/${lesson.id}`} replace />;
    }

    return (
        <MemoryRound
            key={`${lesson.id}:${round}`}
            lesson={lesson}
            onReplay={() => setRound((r) => r + 1)}
        />
    );
}

function MemoryRound({ lesson, onReplay }: MemoryRoundProps) {
    // Besede in vrstni red kartic ostanejo enaki skozi celoten krog
    const [words] = useState(() =>
        lesson.content.wordIds
            .map((id) => wordsById.get(id))
            .filter((word): word is Word => word !== undefined),
    );

    const [cards] = useState(() =>
        shuffle(
            words.flatMap<MemoryCard>((word) => [
                {
                    id: `${word.id}:en`,
                    kind: "en",
                    word,
                },
                {
                    id: `${word.id}:image`,
                    kind: "image",
                    word,
                },
            ]),
        ),
    );

    const { resolvedCount, totalCount, result, dispatch } = useGameSession({
        gameType: "memory",
        itemIds: words.map((word) => word.id),
    });

    const [selected, setSelected] = useState<MemoryCard[]>([]);
    const [solved, setSolved] = useState<Set<string>>(() => new Set());
    const [turns, setTurns] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Dve izbrani kartici ostaneta v stanju samo pri napačnem paru
    const isWaiting = selected.length === 2;

    useEffect(() => {
        if (!isWaiting) return;

        const timer = window.setTimeout(() => {
            setSelected([]);
        }, MISMATCH_DELAY);

        return () => window.clearTimeout(timer);
    }, [isWaiting]);

    // Zadnji par ostane kratek čas viden, nato prikažemo rezultat.
    useEffect(() => {
        if (result === null) return;

        const timer = window.setTimeout(() => {
            setShowResult(true);
        }, FINISH_DELAY);

        return () => window.clearTimeout(timer);
    }, [result]);

    function handleFlip(card: MemoryCard) {
        // Odprtih in rešenih kartic ne moremo izbrati ponovno
        // Med prikazom napačnega para novih kartic ne odpiramo
        if (
            result !== null ||
            isWaiting ||
            solved.has(card.word.id) ||
            selected.some((item) => item.id === card.id)
        ) {
            return;
        }

        if (card.kind === "en") {
            speak(card.word.en);
        }

        const first = selected[0];

        if (!first) {
            setSelected([card]);
            return;
        }

        // Ena poteza pomeni dve odprti kartici
        setTurns((count) => count + 1);

        const isMatch =
            first.word.id === card.word.id && first.kind !== card.kind;

        if (isMatch) {
            setSolved((previous) => {
                const next = new Set(previous);
                next.add(card.word.id);
                return next;
            });
            setSelected([]);

            dispatch({
                type: "resolve-pair",
                itemId: card.word.id,
            });

            // TODO: zvočni učinek za najden par
        } else {
            setSelected([first, card]);
            dispatch({ type: "memory-mismatch" });
        }
    }

    if (showResult && result?.gameType === "memory") {
        return (
            <MemorySave
                lessonId={lesson.id}
                result={result}
                onReplay={onReplay}
            />
        );
    }

    function renderCard(card: MemoryCard, index: number) {
        const isSolved = solved.has(card.word.id);
        const isOpen =
            isSolved || selected.some((item) => item.id === card.id);
        const isUnavailable = isOpen || isWaiting || result !== null;

        let className = "memory__card";
        if (isOpen) className += " memory__card--open";
        if (isSolved) className += " memory__card--solved";

        const label = isOpen
            ? card.kind === "en"
                ? card.word.en
                : `Slika: ${card.word.sl}`
            : `Obrni kartico ${index + 1}`;

        return (
            <button
                key={card.id}
                type="button"
                className={className}
                aria-label={isSolved ? `${label}, najden par` : label}
                aria-pressed={isOpen}
                aria-disabled={isUnavailable}
                onClick={() => handleFlip(card)}
            >
                <span className="memory__card-inner" aria-hidden="true">
                    <span className="memory__face memory__back">
                        <img
                            src={CARD_BACK_IMAGE}
                            alt=""
                            width={72}
                            height={72}
                            draggable={false}
                        />
                    </span>

                    <span className="memory__face memory__front">
                        {card.kind === "en" ? (
                            <span className="memory__word" lang="en">
                                {card.word.en}
                            </span>
                        ) : (
                            <img
                                className="memory__image"
                                src={card.word.imageSrc}
                                alt=""
                                width={80}
                                height={80}
                                draggable={false}
                            />
                        )}
                    </span>
                </span>
            </button>
        );
    }

    return (
        <main className="memory">
            <GameHeader
                title="Spomin"
                done={resolvedCount}
                total={totalCount}
            />

            <p className="memory__turns">
                Število potez: {turns}
            </p>

            <div
                className="memory__board"
                role="group"
                aria-label="Kartice za igro spomin"
                style={{
                    gridTemplateColumns: `repeat(${Math.ceil(cards.length / 4)}, minmax(0, 1fr))`,
                }}
            >
                {cards.map(renderCard)}
            </div>
        </main>
    );
}

// Spomin nima zvezdic; prikažemo zaključek in število potez
function MemorySave({ lessonId, result, onReplay }: MemorySaveProps) {
    const navigate = useNavigate();
    const { saveGame } = useProgress();

    const { status, save, retry } = useGameResultSave(result, (attempt) =>
        saveGame(lessonId, attempt),
    );

    useEffect(() => {
        void save();
    }, [save]);

    const turns = result.totalItems + result.memoryMismatches;

    return (
        <main className="memory">
            <GameResult
                title="Spomin"
                stars={null}
                firstTryCorrect={null}
                total={result.totalItems}
                turns={turns}
                onReplay={onReplay}
                onBack={() => navigate(`/lekcija/${lessonId}`)}
            />

            {status === "saving" && (
                <p className="memory__status" role="status">
                    Shranjevanje rezultata…
                </p>
            )}

            {status === "error" && (
                <div className="memory__save-error">
                    <p className="auth-error" role="alert">
                        Rezultata ni bilo mogoče shraniti.
                    </p>
                    <button
                        type="button"
                        className="memory__action"
                        onClick={() => void retry()}
                    >
                        Poskusi znova
                    </button>
                </div>
            )}
        </main>
    );
}

export default MemoryGame;