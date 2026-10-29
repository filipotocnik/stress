import type { Lesson } from "../../data/lessons";

// "Props" so podatki, ki jih komponenta dobi od starša.
// Tukaj opišemo, kaj RoadmapStop pričakuje.
interface RoadmapStopProps {
  lesson: Lesson;
  side: "left" | "center" | "right"; // kam na poti postavimo otok
  onSelect: (lessonId: string) => void; // funkcija, ki jo pokličemo ob kliku
}

// Ena postaja (otok) na poti.
function RoadmapStop({ lesson, side, onSelect }: RoadmapStopProps) {
  const isLocked = lesson.status === "locked";

  return (
    <div className={`stop stop--${lesson.status} stop--${side}`}>
      <button
        className="stop__island"
        disabled={isLocked}
        onClick={() => onSelect(lesson.id)}
        aria-label={`${lesson.title} (${lesson.titleSl})`}
      >
        {lesson.status === "current" && (
          <span className="stop__now">Tukaj si</span>
        )}
        <span aria-hidden="true">{isLocked ? "🔒" : lesson.icon}</span>
      </button>

      <span className="stop__name">{lesson.title}</span>

      {/* Zvezdice pokažemo samo pri končanih lekcijah */}
      {lesson.status === "done" && (
        <span
          className="stop__stars"
          aria-label={`${lesson.stars} od 3 zvezdic`}
        >
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={n <= lesson.stars ? "star" : "star star--off"}
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
