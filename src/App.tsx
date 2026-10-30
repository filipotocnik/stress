import { useState } from "react";
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router";
import { logIn, register } from "./auth/auth";
import { useAuth } from "./auth/useAuth";
import Navbar from "./components/navbar/Navbar";
import AuthPage, { type AuthFormValues } from "./pages/auth/AuthPage";
import "./pages/auth/AuthPage.css";
import Roadmap from "./pages/home/Roadmap";
import MyLessons from "./pages/my-lessons/MyLessons";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import { lessons, lessonsById } from "./data";

function App() {
	const { user, loading, error } = useAuth();
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

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

	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route
					path="/"
					element={
						<Roadmap
							lessons={lessons}
							onSelectLesson={(id) => navigate(`/lekcija/${id}`)}
						/>
					}
				/>
				<Route path="/lekcije" element={<MyLessons />} />
				<Route
					path="/profil"
					element={
						<Profile
							key={user.uid}
							user={user}
							onEdit={() => navigate("/profil/uredi")}
						/>
					}
				/>
				<Route
					path="/profil/uredi"
					element={<EditProfile key={user.uid} user={user} />}
				/>
				<Route path="/lekcija/:lessonId" element={<LessonPreview />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

// Strani z navigacijo na vrhu
function AppLayout() {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
}

// Zaenkrat pokažemo samo naslov lekcije
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
