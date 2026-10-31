import { useEffect, useRef, useState } from "react";
import { levels } from "../../data";
import type { Lesson } from "../../models/lesson";
import RoadmapStop from "./RoadmapStop";
import "./Roadmap.css";

interface RoadmapProps {
	lessons: Lesson[]; // že razvrščene (data/lessons)
	onSelectLesson: (lessonId: string) => void;
}

// Vzorec cik-cak: levo, sredina, desno, sredina, levo ...
const SIDES = ["left", "center", "right", "center"] as const;

// Začasni napredek. Kasneje ga dobimo iz uporabniškega profila.
const MOCK_PROGRESS: Record<string, { stars: number } | undefined> = {
	colours: { stars: 3 },
};

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

function Roadmap({ lessons, onSelectLesson }: RoadmapProps) {
	const { mapRef, path } = useRoutePath();

	// Koliko lekcij je že končanih (za vrstico napredka)
	const doneCount = lessons.filter(
		(lesson) => MOCK_PROGRESS[lesson.id] !== undefined,
	).length;

	const percent =
		lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;

	// Trenutna lekcija (za kartico z gumbom "Začni lekcijo")
	const currentLesson = lessons.find(
		(lesson) => MOCK_PROGRESS[lesson.id] === undefined,
	);

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

				{lessons.map((lesson, index) => {
					const progress = MOCK_PROGRESS[lesson.id];
					// Naslov nivoja pokažemo pred prvo lekcijo vsakega nivoja
					const isFirstInLevel =
						index === 0 ||
						lessons[index - 1].level !== lesson.level;
					const level = levels.find((l) => l.id === lesson.level);
					const status =
						progress !== undefined
							? "done"
							: lesson.id === currentLesson?.id
								? "current"
								: "locked";

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
								stars={progress?.stars ?? 0}
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
							Začni lekcijo
						</button>
					</div>
				)}

				<div className="card">
					<h2 className="card__title">Tvoj napredek</h2>
					<p>
						{doneCount} od {lessons.length} lekcij
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
