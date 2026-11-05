import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import Tobi from "../../components/mascot/Tobi";
import { RewardIcon } from "../../components/RewardIcon";
import {
	AVATARS,
	getAvatar,
	getMissingStars,
	isAvatarUnlocked,
} from "../../data/avatars";
import { OUTFITS } from "../../data/outfits";
import {
	ACTIVE_FIELD,
	FRAMES,
	isOwned,
	THEMES,
	type ShopItem,
} from "../../data/shop";
import { getTotalStars, type User } from "../../models/user";
import { useProgress } from "../../hooks/useProgress";
import { applyItem, buyItem } from "../../services/shop";
import { plural } from "../../utils/plural";
import "./Rewards.css";

type Tab = "avatarji" | "trgovina";

// Nagrade za zvezdice in trgovina s temami, okvirji in oblačili
function Rewards() {
	const { user } = useProgress();
	const totalStars = user ? getTotalStars(user) : 0;
	// Zavihek je v naslovu (?tab=trgovina), da deluje povezava s profila in gumb Nazaj
	const [searchParams, setSearchParams] = useSearchParams();
	const tab: Tab =
		searchParams.get("tab") === "trgovina" ? "trgovina" : "avatarji";

	function selectTab(next: Tab) {
		setSearchParams(next === "trgovina" ? { tab: next } : {});
	}

	return (
		<main className="rewards">
			<h1 className="rewards__title">Nagrade</h1>
			<div className="rewards__chips">
				<span className="rewards__chip rewards__chip--stars">
					<RewardIcon kind="star" />{" "}
					{plural(totalStars, [
						"zvezdica",
						"zvezdici",
						"zvezdice",
						"zvezdic",
					])}
				</span>
				<span className="rewards__chip rewards__chip--shells">
					<RewardIcon kind="shell" />{" "}
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
					data-ui-sound
					type="button"
					role="tab"
					id="rewards-tab-avatarji"
					aria-selected={tab === "avatarji"}
					aria-controls="rewards-panel"
					className="rewards__tab"
					onClick={() => selectTab("avatarji")}
				>
					Avatarji
				</button>
				<button
					data-ui-sound
					type="button"
					role="tab"
					id="rewards-tab-trgovina"
					aria-selected={tab === "trgovina"}
					aria-controls="rewards-panel"
					className="rewards__tab"
					onClick={() => selectTab("trgovina")}
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
							še {getMissingStars(next, totalStars)}{" "}
							<RewardIcon kind="star" />
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
									{avatar.requiredStars}{" "}
									<RewardIcon kind="star" />
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</>
	);
}

// Teme, okvirji in oblačila, ki jih kupiš s školjkami
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

			<h2 className="rewards__subtitle">Oblačila za Tobija</h2>
			<p className="rewards__description">
				Tobi jih nosi na vseh straneh
			</p>
			<ul className="rewards__shop">
				{OUTFITS.map((item) => (
					<ShopCard key={item.id} item={item} user={user}>
						<Tobi outfit={item.id} size={80} />
					</ShopCard>
				))}
			</ul>
		</>
	);
}

interface ShopCardProps {
	item: ShopItem;
	user: User;
	children: ReactNode; // predogled izdelka
}

// Kartica v trgovini: predogled, ime in gumb glede na stanje
function ShopCard({ item, user, children }: ShopCardProps) {
	const { refresh } = useProgress();
	// Klik na "Kupi" odpre okno, nakup šele po "Da, kupim"
	const [buyOpen, setBuyOpen] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	function closeBuy() {
		setBuyOpen(false);
		setError("");
	}

	// Escape zapre okno, med nakupom pa ne
	useEffect(() => {
		if (!buyOpen || saving) return;
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setBuyOpen(false);
				setError("");
			}
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [buyOpen, saving]);

	const isActive = item.id === user[ACTIVE_FIELD[item.type]];
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
			setBuyOpen(false);
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
				data-ui-sound
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
				data-ui-sound
				type="button"
				className="rewards__buy rewards__buy--use"
				disabled={saving}
				onClick={() => void save(applyItem)}
			>
				{saving ? "…" : "Uporabi"}
			</button>
		);
	} else if (canBuy) {
		button = (
			<button
				data-ui-sound
				type="button"
				className="rewards__buy rewards__buy--buy"
				onClick={() => setBuyOpen(true)}
			>
				Kupi <RewardIcon kind="shell" /> {item.price}
			</button>
		);
	} else {
		button = (
			<button
				data-ui-sound
				type="button"
				className="rewards__buy rewards__buy--locked"
				disabled
			>
				<RewardIcon kind="shell" /> {item.price}
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
				{error && !buyOpen ? (
					<span className="rewards__missing rewards__missing--error">
						{error}
					</span>
				) : (
					<span className="rewards__missing">
						{!isActive && !owned && !canBuy && (
							<>
								še {item.price - user.shells}{" "}
								<RewardIcon kind="shell" />
							</>
						)}
					</span>
				)}
			</div>

			{buyOpen && (
				<div className="buy-dialog__backdrop">
					<div
						className="buy-dialog"
						role="dialog"
						aria-modal="true"
						aria-labelledby={`buy-dialog-title-${item.id}`}
					>
						<h2 id={`buy-dialog-title-${item.id}`}>
							Kupim {item.name}?
						</h2>
						{/* Isti predogled kot na kartici */}
						<div className="buy-dialog__preview">{children}</div>
						<p className="buy-dialog__price">
							Cena: <RewardIcon kind="shell" /> {item.price}
						</p>
						<p className="buy-dialog__rest">
							Ostane ti: <RewardIcon kind="shell" />{" "}
							{user.shells - item.price}
						</p>
						{error && (
							<p className="buy-dialog__error" role="alert">
								{error}
							</p>
						)}
						<div className="buy-dialog__actions">
							<button
								data-ui-sound
								type="button"
								className="buy-dialog__yes"
								disabled={saving}
								onClick={() => void save(buyItem)}
							>
								{saving ? "…" : "Da, kupim"}
							</button>
							<button
								data-ui-sound
								type="button"
								className="buy-dialog__no"
								disabled={saving}
								onClick={closeBuy}
								autoFocus
							>
								{saving ? "…" : "Ne"}
							</button>
						</div>
					</div>
				</div>
			)}
		</li>
	);
}

export default Rewards;
