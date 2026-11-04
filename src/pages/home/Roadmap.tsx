import { useEffect, useRef, useState } from "react";
import { levels } from "../../data";
import type { Lesson } from "../../models/lesson";
import type { LessonProgress } from "../../models/user";
import { getLessonProgression } from "../../game/progression";
import RoadmapStop from "./RoadmapStop";
import "./Roadmap.css";
import WeeklyWordCard from "../../components/weekly-word/WeeklyWordCard";
import TobiBubble from "../../components/mascot/TobiBubble";

interface RoadmapProps {
	lessons: Lesson[]; // že razvrščene (data/lessons)
	progress: Record<string, LessonProgress>;
	onSelectLesson: (lessonId: string) => void;
}

// Vzorec cik-cak: levo, sredina, desno, sredina, levo ...
const SIDES = ["left", "center", "right", "center"] as const;

// Črtkana pot: izmerimo, kje so otoki, in jih povežemo s krivuljami.
// Pot narišemo znova, ko se spremeni velikost zemljevida (npr. širina okna).
function useRoutePath() {
	const mapRef = useRef<HTMLElement>(null);
	const [path, setPath] = useState("");

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		function draw() {
			if (!map) return;
			const mapBox = map.getBoundingClientRect();
			const points = [...map.querySelectorAll(".stop__island")].map(
				(island) => {
					const box = island.getBoundingClientRect();
					return {
						x: box.left - mapBox.left + box.width / 2,
						y: box.top - mapBox.top + box.height / 2,
					};
				},
			);

			if (points.length === 0) {
				setPath("");
				return;
			}

			// Med dvema otokoma narišemo mehko krivuljo v obliki črke S
			let d = `M ${points[0].x} ${points[0].y}`;
			for (let i = 1; i < points.length; i++) {
				const from = points[i - 1];
				const to = points[i];
				const middleY = (from.y + to.y) / 2;
				d += ` C ${from.x} ${middleY} ${to.x} ${middleY} ${to.x} ${to.y}`;
			}
			setPath(d);
		}

		const observer = new ResizeObserver(draw);
		observer.observe(map);
		return () => observer.disconnect();
	}, []);

	return { mapRef, path };
}

function Roadmap({ lessons, progress, onSelectLesson }: RoadmapProps) {
	const { mapRef, path } = useRoutePath();
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
					<TobiBubble mood="encourage" message="Hi! Let's learn!" />
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
