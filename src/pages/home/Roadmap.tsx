import type { Lesson } from "../../data/lessons";
import RoadmapStop from "./RoadmapStop";
import "./Roadmap.css";

interface RoadmapProps {
  lessons: Lesson[];
  onSelectLesson: (lessonId: string) => void;
}

// Vzorec cik-cak: levo, sredina, desno, sredina, levo ...
const SIDES = ["left", "center", "right", "center"] as const;

function Roadmap({ lessons, onSelectLesson }: RoadmapProps) {
  // Koliko lekcij je že končanih (za vrstico napredka)
  const doneCount = lessons.filter((l) => l.status === "done").length;
  const percent = Math.round((doneCount / lessons.length) * 100);

  return (
    <div className="roadmap">
      <section className="roadmap__map" aria-label="Pot učenja">
        {lessons.map((lesson, index) => {
          // Ime meseca pokažemo samo, ko se mesec zamenja
          const isNewMonth =
            index === 0 || lessons[index - 1].month !== lesson.month;

          return (
            <div key={lesson.id} className="roadmap__row">
              {isNewMonth && <h2 className="roadmap__month">{lesson.month}</h2>}
              <RoadmapStop
                lesson={lesson}
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

        <div className="card">
          <h2 className="card__title">Tvoj napredek</h2>
          <p>
            {doneCount} od {lessons.length} lekcij
          </p>
          <div className="progress" aria-hidden="true">
            <div className="progress__fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Roadmap;
