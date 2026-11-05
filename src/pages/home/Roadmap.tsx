import { useState } from "react";
import { useRoutePath } from "../../hooks/useRoutePath";
import { levels, wordsById } from "../../data";
import type { Lesson } from "../../models/lesson";
import type { LessonProgress } from "../../models/user";
import { getLessonProgression } from "../../game/progression";
import RoadmapStop from "./RoadmapStop";
import "./Roadmap.css";
import WeeklyWordCard from "../../components/weekly-word/WeeklyWordCard";
import TobiBubble from "../../components/mascot/TobiBubble";
import { pickRoadmapMessage } from "../../data/tobi-messages";

interface RoadmapProps {
	lessons: Lesson[]; // že razvrščene (data/lessons)
	progress: Record<string, LessonProgress>;
	displayName?: string; // ni na voljo, dokler se profil nalaga
	onSelectLesson: (lessonId: string) => void;
}

// Vzorec cik-cak: levo, sredina, desno, sredina, levo ...
const SIDES = ["left", "center", "right", "center"] as const;

function Roadmap({
	lessons,
	progress,
	displayName,
	onSelectLesson,
}: RoadmapProps) {
	const { mapRef, path } = useRoutePath();
	// Naključno izbiro naredimo samo enkrat, ob prikazu strani
	const [messageChoice] = useState(() => Math.random());
	const [wordChoice] = useState(() => Math.random());
	const progression = getLessonProgression(lessons, progress);

	// Koliko lekcij je že končanih (za vrstico napredka)
	const doneCount = progression.filter(
		(entry) => entry.status === "done",
	).length;
	const percent =
		progression.length > 0
			? Math.round((doneCount / progression.length) * 100)
			: 0;

	// Trenutna lekcija (za kartico z gumbom "Začni lekcijo")
	const currentLesson = progression.find(
		(entry) => entry.status === "current",
	)?.lesson;

	const allDone = progression.length > 0 && doneCount === progression.length;
	const wordIds = currentLesson?.content.wordIds ?? [];
	const tobi = pickRoadmapMessage(messageChoice, allDone, {
		name: displayName,
		lesson: currentLesson,
		word: wordsById.get(wordIds[Math.floor(wordChoice * wordIds.length)]),
	});

	return (
		<div className="roadmap">
			<section
				ref={mapRef}
				className="roadmap__map"
				aria-label="Pot učenja"
			>
				<svg className="roadmap__route" aria-hidden="true">
					<path d={path} />
				</svg>

				{progression.map(({ lesson, status }, index) => {
					const lessonProgress = progress[lesson.id];
					// Naslov nivoja pokažemo pred prvo lekcijo vsakega nivoja
					const isFirstInLevel =
						index === 0 ||
						progression[index - 1].lesson.level !== lesson.level;
					const level = levels.find((l) => l.id === lesson.level);

					return (
						<div key={lesson.id} className="roadmap__row">
							{isFirstInLevel && (
								<h2 className="roadmap__level">
									Nivo {lesson.level}
									{level && ` · ${level.titleSl}`}
								</h2>
							)}
							<RoadmapStop
								lesson={lesson}
								status={status}
								stars={lessonProgress?.stars ?? 0}
								side={SIDES[index % SIDES.length]}
								onSelect={onSelectLesson}
							/>
						</div>
					);
				})}
			</section>

			<aside className="roadmap__side">
				<div className="card">
					<TobiBubble
						mood={tobi.mood}
						message={tobi.message}
						size={144}
					/>
				</div>

				{/* Kartico pokažemo samo, če trenutna lekcija obstaja */}
				{currentLesson && (
					<div className="card">
						<h2 className="card__label">Ta lekcija</h2>
						<p className="current__title">{currentLesson.title}</p>
						<p className="current__subtitle">
							{currentLesson.titleSl}
						</p>
						<button
							className="start-button"
							data-ui-sound
							onClick={() => onSelectLesson(currentLesson.id)}
						>
							{progress[currentLesson.id]
								? "Nadaljuj lekcijo"
								: "Začni lekcijo"}
						</button>
					</div>
				)}

				{/* Beseda tedna */}
				<WeeklyWordCard />

				<div className="card">
					<h2 className="card__label">Tvoj napredek</h2>
					<p>
						{doneCount} od {progression.length} lekcij
					</p>
					<div className="progress" aria-hidden="true">
						<div
							className="progress__fill"
							style={{ width: `${percent}%` }}
						/>
					</div>
				</div>
			</aside>
		</div>
	);
}

export default Roadmap;
