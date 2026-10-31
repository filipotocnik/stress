import type { Lesson } from "../../models/lesson";

// "Props" so podatki, ki jih komponenta dobi od starša.
// Tukaj opišemo, kaj RoadmapStop pričakuje.
interface RoadmapStopProps {
	lesson: Lesson;
	status: "locked" | "current" | "done";
	stars: number;
	side: "left" | "center" | "right"; // kam na poti postavimo otok
	onSelect: (lessonId: string) => void; // funkcija, ki jo pokličemo ob kliku
}

// Ena postaja (otok) na poti.
function RoadmapStop({
	lesson,
	status,
	stars,
	side,
	onSelect,
}: RoadmapStopProps) {
	const isLocked = status === "locked";

	return (
		<div className={`stop stop--${status} stop--${side}`}>
			<button
				className="stop__island"
				disabled={isLocked}
				onClick={() => onSelect(lesson.id)}
				aria-label={`${lesson.title} (${lesson.titleSl})`}
			>
				{status === "current" && (
					<span className="stop__now">Tukaj si</span>
				)}

				{isLocked ? (
					<span aria-hidden="true">🔒</span>
				) : (
					<img src={lesson.icon} alt="" width={48} height={48} />
				)}
			</button>

			<span className="stop__name">{lesson.title}</span>

			{/* Zvezdice pokažemo samo pri končanih lekcijah */}
			{status === "done" && (
				<span
					className="stop__stars"
					aria-label={`${stars} od 3 zvezdic`}
				>
					{[1, 2, 3].map((n) => (
						<span
							key={n}
							className={n <= stars ? "star" : "star star--off"}
							aria-hidden="true"
						>
							★
						</span>
					))}
				</span>
			)}
		</div>
	);
}

export default RoadmapStop;
