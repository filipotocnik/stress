import { useEffect, useState } from "react";
import type { User as AuthUser } from "firebase/auth";
import { getAuthErrorMessage, loadUser, logOut } from "../../auth/auth";
import { getAvatar } from "../../data/avatars";
import { getCompletedCount, getTotalStars, type User } from "../../models/user";
import "./Profile.css";

// TODO: zamenjati z LESSONS.length
const TOTAL_LEVELS = 12;

interface ProfileProps {
	user: AuthUser;
	onEdit?: () => void;
}

function Profile({ user: authUser, onEdit }: ProfileProps) {
	const [user, setUser] = useState<User | null>(null);
	const [loadError, setLoadError] = useState(false);
	const [logoutError, setLogoutError] = useState("");
	const [signingOut, setSigningOut] = useState(false);

	useEffect(() => {
		let active = true;
		loadUser(authUser).then(
			(loaded) => {
				if (active) setUser(loaded);
			},
			() => {
				if (active) setLoadError(true);
			},
		);
		return () => {
			active = false;
		};
	}, [authUser]);

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

	if (!user) {
		return (
			<section className="profile">
				{loadError ? (
					<p className="auth-error" role="alert">
						Profila ni bilo mogoče naložiti. Poskusi znova.
					</p>
				) : (
					<p role="status">Nalaganje profila…</p>
				)}
				{logoutButton}
			</section>
		);
	}

	const completed = getCompletedCount(user);
	const stars = getTotalStars(user);
	const percent = Math.round((completed / TOTAL_LEVELS) * 100);
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
						{completed}/{TOTAL_LEVELS}
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
				<button className="profile__edit" onClick={onEdit}>
					Uredi profil
				</button>
			)}

			{logoutButton}
		</section>
	);
}

export default Profile;
