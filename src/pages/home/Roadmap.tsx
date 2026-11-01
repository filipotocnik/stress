import type { Lesson } from "../../models/lesson";
import { isLessonCompleted, type LessonProgress } from "../../models/user";
import { getLessonAvailability } from "../../game/progression";
import RoadmapStop from "./RoadmapStop";
import "./Roadmap.css";

interface RoadmapProps {
	lessons: Lesson[];
	progress: Record<string, LessonProgress>;
	onSelectLesson: (lessonId: string) => void;
}

// Vzorec cik-cak: levo, sredina, desno, sredina, levo ...
const SIDES = ["left", "center", "right", "center"] as const;

function Roadmap({ lessons, progress, onSelectLesson }: RoadmapProps) {
	// Kopijo razvrstimo, da ne spreminjamo izvornih podatkov.
	const orderedLessons = [...lessons].sort(
		(a, b) => a.level - b.level || a.order - b.order,
	);

	// Koliko lekcij je že končanih (za vrstico napredka)
	const doneCount = orderedLessons.filter((lesson) =>
		isLessonCompleted(progress[lesson.id]),
	).length;

	const percent =
		orderedLessons.length > 0
			? Math.round((doneCount / orderedLessons.length) * 100)
			: 0;

	// Trenutna lekcija (za kartico z gumbom "Začni lekcijo")
	const currentLesson = orderedLessons.find(
		(lesson) =>
			getLessonAvailability(orderedLessons, progress, lesson.id) ===
			"current",
	);

	return (
		<div className="roadmap">
			<section className="roadmap__map" aria-label="Pot učenja">
				{orderedLessons.map((lesson, index) => {
					const lessonProgress = progress[lesson.id];
					const status = getLessonAvailability(
						orderedLessons,
						progress,
						lesson.id,
					);

					return (
						<div key={lesson.id} className="roadmap__row">
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
				<div className="card hello">
					<span className="hello__character" aria-hidden="true">
						🦊
					</span>
					<p className="hello__bubble">Hi! Let's learn!</p>
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
							onClick={() => onSelectLesson(currentLesson.id)}
						>
							{progress[currentLesson.id]
								? "Nadaljuj lekcijo"
								: "Začni lekcijo"}
						</button>
					</div>
				)}

				<div className="card">
					<h2 className="card__title">Tvoj napredek</h2>
					<p>
						{doneCount} od {orderedLessons.length} lekcij
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
