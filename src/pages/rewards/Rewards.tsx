import { AVATARS, isAvatarUnlocked } from "../../data/avatars";
import { getTotalStars } from "../../models/user";
import { useProgress } from "../../progress/useProgress";
import "./Rewards.css";

// Nagrade za zvezdice, kasneje bodo tu tudi teme
function Rewards() {
	const { user } = useProgress();
	const totalStars = user ? getTotalStars(user) : 0;

	return (
		<main className="rewards">
			<h1 className="rewards__title">Nagrade</h1>
			<p className="rewards__stars">Imaš ⭐ {totalStars}</p>

			<h2 className="rewards__subtitle">Avatarji</h2>
			{/* Samo pregled, avatar se menja v Uredi profil */}
			<ul className="rewards__grid">
				{AVATARS.map((avatar) => {
					const unlocked = isAvatarUnlocked(avatar, totalStars);

					let className = "rewards__avatar";
					if (!unlocked) className += " rewards__avatar--locked";

					return (
						<li key={avatar.id} className={className}>
							<img src={avatar.image} alt="" />
							<span className="rewards__name">{avatar.name}</span>
							{unlocked ? (
								<span className="rewards__status">
									odklenjeno
								</span>
							) : (
								<span className="rewards__status">
									{avatar.requiredStars} ⭐
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default Rewards;
