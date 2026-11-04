import { useState } from "react";
import { getAuthErrorMessage, logOut } from "../../auth/auth";
import { lessons } from "../../data/lessons";
import { getTotalXp, getUserLevel } from "../../game/scoring";
import { getAvatar } from "../../data/avatars";
import { getCompletedCount, getTotalStars, type User } from "../../models/user";
import "./Profile.css";

interface ProfileProps {
	user: User;
	onEdit?: () => void;
}

function Profile({ user, onEdit }: ProfileProps) {
	const [logoutError, setLogoutError] = useState("");
	const [signingOut, setSigningOut] = useState(false);

	async function handleLogOut() {
		setSigningOut(true);
		setLogoutError("");
		try {
			await logOut();
		} catch (error) {
			setLogoutError(getAuthErrorMessage(error));
			setSigningOut(false);
		}
	}

	const logoutButton = (
		<>
			{logoutError && (
				<p className="auth-error" role="alert">
					{logoutError}
				</p>
			)}
			<button
				className="profile__logout"
				onClick={handleLogOut}
				disabled={signingOut}
			>
				{signingOut ? "Odjavljanje…" : "Odjavi se"}
			</button>
		</>
	);

	const completed = getCompletedCount(user);
	const stars = getTotalStars(user);
	const percent =
		lessons.length === 0
			? 0
			: Math.round((completed / lessons.length) * 100);
	const xp = getTotalXp(stars);
	const userLevel = getUserLevel(xp);
	const avatar = getAvatar(user.avatar);

	return (
		<section className="profile">
			<img
				className="profile__avatar"
				src={avatar.image}
				alt={avatar.name}
			/>
			<h1 className="profile__name">{user.displayName}</h1>

			<section className="profile__stats">
				<div className="profile__stat">
					<span className="profile__value">
						{completed}/{lessons.length}
					</span>
					<span className="profile__label">Končane</span>
				</div>
				<div className="profile__stat">
					<span className="profile__value">⭐ {stars}</span>
					<span className="profile__label">Zvezdice</span>
				</div>
			</section>

			<div className="profile__progress">
				<div
					className="profile__bar"
					style={{ width: `${percent}%` }}
				/>
			</div>
			<p className="profile__percent">{percent}% poti</p>
			<p>
				{xp} XP · Raven {userLevel}
			</p>

			<h2 className="profile__info-title">Moji podatki</h2>
			<section className="profile__info">
				<dl>
					<dt>Ime in priimek</dt>
					<dd>
						{user.firstName} {user.lastName}
					</dd>
					<dt>Uporabniško ime</dt>
					<dd>{user.displayName}</dd>
					<dt>E-pošta</dt>
					<dd>{user.email}</dd>
				</dl>
			</section>

			{onEdit && (
				<button
					className="profile__edit"
					data-ui-sound
					onClick={onEdit}
				>
					Uredi profil
				</button>
			)}

			{logoutButton}
		</section>
	);
}

export default Profile;
