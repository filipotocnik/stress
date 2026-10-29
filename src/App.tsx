import { useState } from "react";
import { logIn, register } from "./auth/auth";
import { useAuth } from "./auth/useAuth";
import AuthPage, { type AuthFormValues } from "./pages/auth/AuthPage";
import "./pages/auth/AuthPage.css";
import Roadmap from "./pages/home/Roadmap";
import { lessons, lessonsById } from "./data";

function App() {
	const { user, loading, error } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	// "state" = podatek, ki si ga komponenta zapomni.
	// Ko se spremeni, React sam ponovno izriše zaslon.
	const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
		null,
	);

	async function handleAuthenticate(values: AuthFormValues) {
		setSubmitting(true);
		try {
			if (values.mode === "register") {
				await register(
					values.displayName,
					values.email,
					values.password,
				);
			} else {
				await logIn(values.email, values.password);
			}
		} finally {
			setSubmitting(false);
		}
	}

	// delete this, just for testing without auth bcs im lazy
	/*if (import.meta.env.DEV) {
		return <Roadmap lessons={lessons} onSelectLesson={() => { }} />;
	}*/

	if (loading || error || !user || submitting) {
		return (
			<main className="auth-layout">
				{loading ? (
					<p role="status">Nalaganje…</p>
				) : error ? (
					<p className="auth-error" role="alert">
						{error}
					</p>
				) : (
					<AuthPage
						submitting={submitting}
						onSubmit={handleAuthenticate}
					/>
				)}
			</main>
		);
	}

	// Če je izbrana lekcija, (zaenkrat) pokažemo samo njen naslov.
	if (selectedLessonId !== null) {
		const lesson = lessonsById.get(selectedLessonId);
		return (
			<main style={{ padding: 24 }}>
				<button onClick={() => setSelectedLessonId(null)}>
					← Nazaj
				</button>
				<h1>{lesson?.title}</h1>
			</main>
		);
	}

	return <Roadmap lessons={lessons} onSelectLesson={setSelectedLessonId} />;
}

export default App;
