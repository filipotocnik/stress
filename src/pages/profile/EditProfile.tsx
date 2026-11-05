import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import type { User as AuthUser } from "firebase/auth";
import { ensureUserProfile, updateUser } from "../../auth/auth";
import { AVATARS, isAvatarUnlocked } from "../../data/avatars";
import { getTotalStars, type UserProfile } from "../../models/user";
import { useProgress } from "../../hooks/useProgress";
import "./EditProfile.css";

const MAX_VISIBLE_AVATARS = 5;

function EditProfile({ user }: { user: AuthUser }) {
	const navigate = useNavigate();
	const { user: progressUser, refresh } = useProgress();
	const totalStars = progressUser ? getTotalStars(progressUser) : 0;
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loadError, setLoadError] = useState(false);
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		if (!dialogOpen) return;
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setDialogOpen(false);
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dialogOpen]);

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
			await refresh();
			navigate("/profil");
		} catch (saveError) {
			setError(
				saveError instanceof Error &&
					saveError.message === "avatar-locked"
					? "Ta avatar je še zaklenjen."
					: "Shranjevanje ni uspelo. Poskusi znova.",
			);
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

	const avatars = AVATARS.filter(
		(avatar) =>
			isAvatarUnlocked(avatar, totalStars) ||
			avatar.id === profile.avatar,
	);
	const selected = selectedAvatar ?? profile.avatar;

	let visibleAvatars = avatars;
	if (avatars.length > MAX_VISIBLE_AVATARS) {
		visibleAvatars = avatars.slice(0, MAX_VISIBLE_AVATARS);
		const selectedItem = avatars.find((avatar) => avatar.id === selected);
		if (selectedItem && !visibleAvatars.includes(selectedItem)) {
			visibleAvatars = [
				...avatars.slice(0, MAX_VISIBLE_AVATARS - 1),
				selectedItem,
			];
		}
	}
	const hiddenCount = avatars.length - visibleAvatars.length;
	const hasLocked = AVATARS.some(
		(avatar) => !isAvatarUnlocked(avatar, totalStars),
	);

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
						{visibleAvatars.map((avatar) => (
							<label
								key={avatar.id}
								className="edit-profile__avatar"
							>
								<input
									data-ui-sound
									type="radio"
									name="avatar"
									value={avatar.id}
									checked={avatar.id === selected}
									onChange={() =>
										setSelectedAvatar(avatar.id)
									}
								/>
								<img src={avatar.image} alt={avatar.name} />
							</label>
						))}
						{hiddenCount > 0 ? (
							<button
								data-ui-sound
								type="button"
								className="edit-profile__more"
								aria-label="Prikaži vse avatarje"
								onClick={() => setDialogOpen(true)}
							>
								+{hiddenCount}
							</button>
						) : (
							hasLocked && (
								<button
									data-ui-sound
									type="button"
									className="edit-profile__more"
									aria-label="Odkleni več avatarjev"
									onClick={() => navigate("/nagrade")}
								>
									🔒
								</button>
							)
						)}
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
							data-ui-sound
							type="button"
							className="edit-profile__cancel"
							onClick={() => navigate("/profil")}
						>
							Prekliči
						</button>
						<button
							data-ui-sound
							type="submit"
							className="edit-profile__save"
						>
							{saving ? "Shranjevanje…" : "Shrani"}
						</button>
					</div>
				</fieldset>
			</form>

			{dialogOpen && (
				<div className="avatar-dialog__backdrop">
					<div
						className="avatar-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby="avatar-dialog-title"
					>
						<h2 id="avatar-dialog-title">Izberi profilno sliko</h2>
						<div className="avatar-dialog__grid">
							{avatars.map((avatar) => (
								<button
									data-ui-sound
									key={avatar.id}
									type="button"
									className={
										avatar.id === selected
											? "avatar-dialog__option avatar-dialog__option--selected"
											: "avatar-dialog__option"
									}
									aria-pressed={avatar.id === selected}
									onClick={() => {
										setSelectedAvatar(avatar.id);
										setDialogOpen(false);
									}}
								>
									<img src={avatar.image} alt={avatar.name} />
								</button>
							))}
							{hasLocked && (
								<button
									data-ui-sound
									type="button"
									className="avatar-dialog__option avatar-dialog__option--unlock"
									onClick={() => navigate("/nagrade")}
								>
									<span aria-hidden="true">🔒</span>
									Odkleni več
								</button>
							)}
						</div>
						<button
							data-ui-sound
							type="button"
							className="avatar-dialog__close"
							onClick={() => setDialogOpen(false)}
							autoFocus
						>
							Zapri
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default EditProfile;
