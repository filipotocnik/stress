import { useState } from "react";
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router";
import { getAuthErrorMessage, logIn, logOut, register } from "./auth/auth";
import { useAuth } from "./auth/useAuth";
import LessonAccess from "./components/lesson/LessonAccess";
import Navbar from "./components/navbar/Navbar";
import AuthPage, { type AuthFormValues } from "./pages/auth/AuthPage";
import "./pages/auth/AuthPage.css";
import Roadmap from "./pages/home/Roadmap";
import MyLessons from "./pages/my-lessons/MyLessons";
import Profile from "./pages/profile/Profile";
import { lessons, lessonsById } from "./data";
import { ProgressProvider } from "./progress/ProgressProvider";
import { useProgress } from "./progress/useProgress";

function App() {
	const { user, loading, error } = useAuth();
	const [submitting, setSubmitting] = useState(false);

	async function handleAuthenticate(values: AuthFormValues) {
		setSubmitting(true);
		try {
			if (values.mode === "register") {
				const { firstName, lastName, displayName, avatar } = values;
				await register(
					{ firstName, lastName, displayName, avatar },
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

	return (
		<ProgressProvider user={user}>
			<AuthenticatedRoutes />
		</ProgressProvider>
	);
}

function AuthenticatedRoutes() {
	const navigate = useNavigate();
	const { user } = useProgress();
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					path="/"
					element={
						<Roadmap
							lessons={lessons}
							progress={user?.lessonProgress ?? {}}
							onSelectLesson={(id) => navigate(`/lekcija/${id}`)}
						/>
					}
				/>
				<Route path="/lekcije" element={<MyLessons />} />
				<Route
					path="/profil"
					element={user && <Profile key={user.id} user={user} />}
				/>
				<Route path="/lekcija/:lessonId" element={<LessonAccess />}>
					<Route index element={<LessonPreview />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

function AppLayout() {
	const { user, loading, error, refresh } = useProgress();
	const [logoutError, setLogoutError] = useState("");

	async function handleLogOut() {
		try {
			await logOut();
		} catch (error) {
			setLogoutError(getAuthErrorMessage(error));
		}
	}

	return (
		<>
			<Navbar />
			{!user ? (
				<main className="auth-layout">
					<section className="auth-card">
						{loading ? (
							<p role="status">Nalaganje napredka…</p>
						) : (
							<>
								<p className="auth-error" role="alert">
									Podatkov ni bilo mogoče naložiti.
								</p>
								<button onClick={() => void refresh()}>
									Poskusi znova
								</button>
							</>
						)}
						{logoutError && <p role="alert">{logoutError}</p>}
						<button onClick={handleLogOut}>Odjavi se</button>
					</section>
				</main>
			) : (
				<>
					{error && (
						<section>
							<p className="auth-error" role="alert">
								Napredka ni bilo mogoče osvežiti. Prikazani so
								zadnji naloženi podatki.
							</p>
							<button onClick={() => void refresh()}>
								Poskusi znova
							</button>
						</section>
					)}
					{loading && <p role="status">Osveževanje napredka…</p>}
					<Outlet />
				</>
			)}
		</>
	);
}

function LessonPreview() {
	const { lessonId } = useParams();
	const lesson = lessonsById.get(lessonId ?? "");

	return (
		<main style={{ padding: 24 }}>
			<h1>{lesson?.title}</h1>
		</main>
	);
}

export default App;
