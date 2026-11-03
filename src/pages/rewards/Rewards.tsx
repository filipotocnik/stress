import { useState, type ReactNode } from "react";
import {
	AVATARS,
	getAvatar,
	getMissingStars,
	isAvatarUnlocked,
} from "../../data/avatars";
import { FRAMES, isOwned, THEMES, type ShopItem } from "../../data/shop";
import { getTotalStars, type User } from "../../models/user";
import { useProgress } from "../../progress/useProgress";
import { applyItem, buyItem } from "../../services/shop";
import { plural } from "../../utils/plural";
import "./Rewards.css";

type Tab = "avatarji" | "trgovina";

// Nagrade za zvezdice in trgovina s temami in okvirji
function Rewards() {
	const { user } = useProgress();
	const totalStars = user ? getTotalStars(user) : 0;
	const [tab, setTab] = useState<Tab>("avatarji");

	return (
		<main className="rewards">
			<h1 className="rewards__title">Nagrade</h1>
			<div className="rewards__chips">
				<span className="rewards__chip rewards__chip--stars">
					⭐{" "}
					{plural(totalStars, [
						"zvezdica",
						"zvezdici",
						"zvezdice",
						"zvezdic",
					])}
				</span>
				<span className="rewards__chip rewards__chip--shells">
					🐚{" "}
					{plural(user?.shells ?? 0, [
						"školjka",
						"školjki",
						"školjke",
						"školjk",
					])}
				</span>
			</div>

			<div className="rewards__tabs" role="tablist">
				<button
					type="button"
					role="tab"
					id="rewards-tab-avatarji"
					aria-selected={tab === "avatarji"}
					aria-controls="rewards-panel"
					className="rewards__tab"
					onClick={() => setTab("avatarji")}
				>
					Avatarji
				</button>
				<button
					type="button"
					role="tab"
					id="rewards-tab-trgovina"
					aria-selected={tab === "trgovina"}
					aria-controls="rewards-panel"
					className="rewards__tab"
					onClick={() => setTab("trgovina")}
				>
					Trgovina
				</button>
			</div>

			<div
				id="rewards-panel"
				role="tabpanel"
				aria-labelledby={`rewards-tab-${tab}`}
			>
				{tab === "avatarji" ? (
					<AvatarsTab totalStars={totalStars} />
				) : (
					user && <ShopTab user={user} />
				)}
			</div>
		</main>
	);
}

// Naslednji avatar in mreža vseh avatarjev
function AvatarsTab({ totalStars }: { totalStars: number }) {
	// AVATARS so razvrščeni po zvezdicah, prvi zaklenjen je naslednji
	const next = AVATARS.find(
		(avatar) => !isAvatarUnlocked(avatar, totalStars),
	);

	return (
		<>
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
		</>
	);
}

// Teme in okvirji, ki jih kupiš s školjkami
function ShopTab({ user }: { user: User }) {
	const avatar = getAvatar(user.avatar);

	return (
		<>
			<h2 className="rewards__subtitle">Teme</h2>
			<p className="rewards__description">
				Spremeni barve cele aplikacije
			</p>
			<ul className="rewards__shop">
				{THEMES.map((item) => (
					<ShopCard key={item.id} item={item} user={user}>
						<div
							className="rewards__preview"
							data-theme-preview={item.id}
							aria-hidden="true"
						>
							<div className="rewards__preview-bar">
								<span className="rewards__preview-dash" />
							</div>
							<div className="rewards__preview-body">
								<span className="rewards__preview-circle" />
								<span className="rewards__preview-rect" />
							</div>
						</div>
					</ShopCard>
				))}
			</ul>

			<h2 className="rewards__subtitle">Okvirji za avatar</h2>
			<p className="rewards__description">
				Okvir se pokaže okoli tvojega avatarja
			</p>
			<ul className="rewards__shop">
				{FRAMES.map((item) => (
					<ShopCard key={item.id} item={item} user={user}>
						{/* Okvir je na ovoju, img ne podpira ::before/::after */}
						<span className={`rewards__frame frame--${item.id}`}>
							<img src={avatar.image} alt="" />
						</span>
					</ShopCard>
				))}
			</ul>
		</>
	);
}

interface ShopCardProps {
	item: ShopItem;
	user: User;
	children: ReactNode; // predogled teme ali okvirja
}

// Kartica v trgovini: predogled, ime in gumb glede na stanje
function ShopCard({ item, user, children }: ShopCardProps) {
	const { refresh } = useProgress();
	// Prvi klik na "Kupi" le vpraša, nakup šele po "Da"
	const [confirming, setConfirming] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const activeId =
		item.type === "theme" ? user.activeTheme : user.activeFrame;
	const isActive = item.id === activeId;
	const owned = isOwned(item, user.ownedItems);
	const canBuy = user.shells >= item.price;

	// Shrani v bazo in osveži podatke, da kartica pokaže novo stanje
	async function save(
		action: (uid: string, itemId: string) => Promise<void>,
	) {
		setSaving(true);
		setError("");
		try {
			await action(user.id, item.id);
			await refresh();
			setConfirming(false);
		} catch (saveError) {
			setError(
				saveError instanceof Error &&
					saveError.message === "not-enough-shells"
					? "Premalo školjk."
					: "Ni uspelo. Poskusi znova.",
			);
		} finally {
			setSaving(false);
		}
	}

	let button;
	if (isActive) {
		button = (
			<button
				type="button"
				className="rewards__buy rewards__buy--active"
				disabled
			>
				✓ V uporabi
			</button>
		);
	} else if (owned) {
		button = (
			<button
				type="button"
				className="rewards__buy rewards__buy--use"
				disabled={saving}
				onClick={() => void save(applyItem)}
			>
				{saving ? "…" : "Uporabi"}
			</button>
		);
	} else if (confirming) {
		button = (
			<div className="rewards__confirm">
				<span>Kupim za 🐚 {item.price}?</span>
				<div className="rewards__confirm-actions">
					<button
						type="button"
						className="rewards__confirm-yes"
						disabled={saving}
						onClick={() => void save(buyItem)}
					>
						{saving ? "…" : "Da"}
					</button>
					<button
						type="button"
						className="rewards__confirm-no"
						disabled={saving}
						onClick={() => {
							setConfirming(false);
							setError("");
						}}
					>
						Ne
					</button>
				</div>
			</div>
		);
	} else if (canBuy) {
		button = (
			<button
				type="button"
				className="rewards__buy rewards__buy--buy"
				onClick={() => setConfirming(true)}
			>
				Kupi 🐚 {item.price}
			</button>
		);
	} else {
		button = (
			<button
				type="button"
				className="rewards__buy rewards__buy--locked"
				disabled
			>
				🐚 {item.price}
			</button>
		);
	}

	return (
		<li
			className={
				isActive
					? "rewards__item rewards__item--active"
					: "rewards__item"
			}
		>
			{children}
			<span className="rewards__item-name">{item.name}</span>
			<div className="rewards__action">
				{button}
				{/* Vrstica je vedno tu, da so gumbi v isti višini */}
				{error ? (
					<span className="rewards__missing rewards__missing--error">
						{error}
					</span>
				) : (
					<span className="rewards__missing">
						{!isActive &&
							!owned &&
							!canBuy &&
							`še ${item.price - user.shells} 🐚`}
					</span>
				)}
			</div>
		</li>
	);
}

export default Rewards;
