import { useState } from "react";
import Roadmap from "./components/Roadmap/Roadmap";
import { LESSONS } from "./data/lessons";

function App() {
  // "state" = podatek, ki si ga komponenta zapomni.
  // Ko se spremeni, React sam ponovno izriše zaslon.
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // Če je izbrana lekcija, (zaenkrat) pokažemo samo njen naslov.
  // Pravi zaslon lekcije bo naredil kdo drug v skupini.
  if (selectedLessonId !== null) {
    const lesson = LESSONS.find((l) => l.id === selectedLessonId);
    return (
      <main style={{ padding: 24 }}>
        <button onClick={() => setSelectedLessonId(null)}>← Nazaj</button>
        <h1>{lesson?.title}</h1>
      </main>
    );
  }

  return <Roadmap lessons={LESSONS} onSelectLesson={setSelectedLessonId} />;
}

export default App;
