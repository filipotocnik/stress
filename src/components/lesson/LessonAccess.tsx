import { Navigate, Outlet, useParams } from "react-router";
import { lessons } from "../../data/lessons";
import { getLessonAvailability } from "../../game/progression";
import { useProgress } from "../../hooks/useProgress";

export default function LessonAccess() {
	const { lessonId } = useParams();
	const { user } = useProgress();
	if (!user) return null;
	if (
		getLessonAvailability(lessons, user.lessonProgress, lessonId ?? "") ===
		"locked"
	) {
		return <Navigate to="/" replace />;
	}
	return <Outlet key={`${user.id}:${lessonId}`} />;
}
