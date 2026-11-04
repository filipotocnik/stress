import { AVATARS, getMissingStars, isAvatarUnlocked } from "../../data/avatars";
import { getTotalStars } from "../../models/user";
import { useProgress } from "../../hooks/useProgress";
import "./Rewards.css";

function Rewards() {
	const { user } = useProgress();
	const totalStars = user ? getTotalStars(user) : 0;
	const next = AVATARS.find(
		(avatar) => !isAvatarUnlocked(avatar, totalStars),
	);

	return (
		<main className="rewards">
			<h1 className="rewards__title">Nagrade</h1>
			<p className="rewards__stars">Imaš ⭐ {totalStars}</p>

			{next ? (
				<section className="rewards__next">
					<img
						className="rewards__next-image"
						src={next.image}
						alt=""
					/>
					<div className="rewards__next-info">
						<p className="rewards__next-name">
							Naslednji avatar: {next.name}
						</p>
						<div
							className="rewards__progress"
							role="progressbar"
							aria-valuenow={totalStars}
							aria-valuemax={next.requiredStars}
							aria-label="Napredek do naslednjega avatarja"
						>
							<div
								className="rewards__bar"
								style={{
									width: `${Math.min(100, (totalStars / next.requiredStars) * 100)}%`,
								}}
							/>
						</div>
						<p className="rewards__next-missing">
							še {getMissingStars(next, totalStars)} ⭐
						</p>
					</div>
				</section>
			) : (
				<p className="rewards__done">Odklenil si vse avatarje! 🎉</p>
			)}

			<h2 className="rewards__subtitle">Avatarji</h2>
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
