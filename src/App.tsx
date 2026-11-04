import { useEffect, useState } from "react";
import type { User as AuthUser } from "firebase/auth";
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
import FillGame from "./pages/games/FillGame";
import MatchGame from "./pages/games/MatchGame";
import Roadmap from "./pages/home/Roadmap";
import LessonPage from "./pages/lesson/LessonPage";
import EditProfile from "./pages/profile/EditProfile";
import Profile from "./pages/profile/Profile";
import Rewards from "./pages/rewards/Rewards";
import { lessons } from "./data";
import { DEFAULT_THEME, getShopItem } from "./data/shop";
import { ProgressProvider } from "./progress/ProgressProvider";
import { useProgress } from "./progress/useProgress";

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
			navigate("/", { replace: true });
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
			<AuthenticatedRoutes authUser={user} />
		</ProgressProvider>
	);
}

function AuthenticatedRoutes({ authUser }: { authUser: AuthUser }) {
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
				<Route path="/nagrade" element={<Rewards />} />
				<Route
					path="/profil"
					element={
						user && (
							<Profile
								key={user.id}
								user={user}
								onEdit={() => navigate("/profil/uredi")}
							/>
						)
					}
				/>
				<Route
					path="/profil/uredi"
					element={<EditProfile key={authUser.uid} user={authUser} />}
				/>
				<Route path="/lekcija/:lessonId" element={<LessonAccess />}>
					<Route index element={<LessonRoute />} />
					<Route path="igra/:gameId" element={<GameRoute />} />
				</Route>
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

// Strani z navigacijo na vrhu
function AppLayout() {
	const { user, loading, error, refresh } = useProgress();
	const [logoutError, setLogoutError] = useState("");
	const activeTheme = user?.activeTheme;

	// Izbrana tema velja za celo aplikacijo, barve so v styles/themes.css
	useEffect(() => {
		const root = document.documentElement;
		// Neznan id ali id okvirja obravnavamo kot privzeto temo
		const isTheme = getShopItem(activeTheme ?? "")?.type === "theme";
		if (!activeTheme || activeTheme === DEFAULT_THEME || !isTheme) {
			root.removeAttribute("data-theme");
		} else {
			root.dataset.theme = activeTheme;
		}
		// Ob odjavi se vrne privzeta tema
		return () => root.removeAttribute("data-theme");
	}, [activeTheme]);

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

// Lekcijo poiščemo po id-ju iz naslova, neznan id vrne na zemljevid
function LessonRoute() {
	const { lessonId } = useParams();
	const { user } = useProgress();
	const index = lessons.findIndex((lesson) => lesson.id === lessonId);

	if (index === -1) {
		return <Navigate to="/" replace />;
	}

	return (
		<LessonPage
			key={lessonId}
			lesson={lessons[index]}
			number={index + 1}
			progress={user?.lessonProgress[lessons[index].id]}
		/>
	);
}

// Igro izberemo po id-ju iz naslova, neznana igra vrne na lekcijo
function GameRoute() {
	const { lessonId, gameId } = useParams();
	const lesson = lessons.find((lesson) => lesson.id === lessonId);

	if (!lesson) {
		return <Navigate to="/" replace />;
	}

	if (gameId === "matching") {
		return <MatchGame key={lesson.id} lesson={lesson} />;
	}

	if (gameId === "grammar") {
		return <FillGame key={lesson.id} lesson={lesson} />;
	}

	return <Navigate to={`/lekcija/${lesson.id}`} replace />;
}

export default App;
