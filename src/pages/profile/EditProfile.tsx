import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type { User as AuthUser } from "firebase/auth";
import { ensureUserProfile, updateUser } from "../../auth/auth";
import { AVATARS } from "../../data/avatars";
import type { UserProfile } from "../../models/user";
import "./EditProfile.css";

function EditProfile({ user }: { user: AuthUser }) {
	const navigate = useNavigate();
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loadError, setLoadError] = useState(false);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		let active = true;
		ensureUserProfile(user).then(
			(loaded) => {
				if (active) setProfile(loaded);
			},
			() => {
				if (active) setLoadError(true);
			},
		);
		return () => {
			active = false;
		};
	}, [user]);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const data = new FormData(event.currentTarget);
		const newProfile: UserProfile = {
			firstName: String(data.get("firstName") ?? "").trim(),
			lastName: String(data.get("lastName") ?? "").trim(),
			displayName: String(data.get("displayName") ?? "").trim(),
			avatar: String(data.get("avatar") ?? ""),
		};
		if (
			!newProfile.firstName ||
			!newProfile.lastName ||
			!newProfile.displayName
		) {
			setError("Izpolni ime, priimek in uporabniško ime.");
			return;
		}

		setError("");
		setSaving(true);
		try {
			await updateUser(user, newProfile);
			navigate("/profil");
		} catch {
			setError("Shranjevanje ni uspelo. Poskusi znova.");
			setSaving(false);
		}
	}

	if (!profile) {
		return (
			<section className="edit-profile">
				{loadError ? (
					<p className="auth-error" role="alert">
						Profila ni bilo mogoče naložiti. Poskusi znova.
					</p>
				) : (
					<p role="status">Nalaganje profila…</p>
				)}
			</section>
		);
	}

	return (
		<section className="edit-profile">
			<h1>Uredi profil</h1>
			<p className="edit-profile__description">
				Spremeni svoje podatke in profilno sliko.
			</p>

			<form onSubmit={handleSubmit}>
				<fieldset disabled={saving} className="edit-profile__fields">
					<div className="edit-profile__row">
						<label className="edit-profile__field">
							Ime
							<input
								name="firstName"
								autoComplete="given-name"
								defaultValue={profile.firstName}
								required
								maxLength={40}
							/>
						</label>
						<label className="edit-profile__field">
							Priimek
							<input
								name="lastName"
								autoComplete="family-name"
								defaultValue={profile.lastName}
								required
								maxLength={40}
							/>
						</label>
					</div>
					<label className="edit-profile__field">
						Uporabniško ime
						<input
							name="displayName"
							autoComplete="nickname"
							defaultValue={profile.displayName}
							required
							maxLength={40}
						/>
					</label>

					<fieldset className="edit-profile__avatars">
						<legend>Profilna slika</legend>
						{AVATARS.map((avatar) => (
							<label
								key={avatar.id}
								className="edit-profile__avatar"
							>
								<input
									type="radio"
									name="avatar"
									value={avatar.id}
									defaultChecked={
										avatar.id === profile.avatar
									}
								/>
								<img src={avatar.image} alt={avatar.name} />
							</label>
						))}
					</fieldset>

					<p className="edit-profile__email">
						e-pošta: {user.email} (je ni mogoče spremeniti)
					</p>

					{error && (
						<p className="auth-error" role="alert">
							{error}
						</p>
					)}

					<div className="edit-profile__actions">
						<button
							type="button"
							className="edit-profile__cancel"
							onClick={() => navigate("/profil")}
						>
							Prekliči
						</button>
						<button type="submit" className="edit-profile__save">
							{saving ? "Shranjevanje…" : "Shrani"}
						</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}

export default EditProfile;
