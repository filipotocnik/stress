import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  ensureUserProfile,
  getAuthErrorMessage,
  logOut,
} from "../../auth/auth";
import type { UserProfile } from "../../models/user";

export default function AccountPage({ user }: { user: User }) {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [profileError, setProfileError] = useState("");
	const [logoutError, setLogoutError] = useState("");
	const [signingOut, setSigningOut] = useState(false);
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let active = true;
		ensureUserProfile(user).then(
			(profile) => {
				if (active) setProfile(profile);
			},
			() => {
				if (active) {
					setProfileError(
						"Prijava je uspela, vendar profila ni bilo mogoče naložiti. Poskusi znova.",
					);
				}
			},
		);
		return () => {
			active = false;
		};
	}, [user, attempt]);

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

	return (
		<section className="auth-card" aria-labelledby="account-title">
			<h1 id="account-title">
				{profile?.displayName
					? `Živjo, ${profile.displayName}!`
					: "Prijava je uspela"}
			</h1>
			<p className="auth-description">{user.email}</p>
			{!profile && !profileError && (
				<p role="status">Nalaganje profila…</p>
			)}
			{profile && (
				<p className="auth-description">
					Tvoj račun je pripravljen. Tukaj bo prikazana tvoja učna
					pot.
				</p>
			)}
			{profileError && (
				<>
					<p className="auth-error" role="alert">
						{profileError}
					</p>
					<button
						className="auth-button auth-button--secondary"
						onClick={() => {
							setProfileError("");
							setAttempt((value) => value + 1);
						}}
					>
						Poskusi znova
					</button>
				</>
			)}
			{logoutError && (
				<p className="auth-error" role="alert">
					{logoutError}
				</p>
			)}
			<button
				className="auth-button"
				onClick={handleLogOut}
				disabled={signingOut}
			>
				{signingOut ? "Odjavljanje…" : "Odjavi se"}
			</button>
		</section>
	);
}
