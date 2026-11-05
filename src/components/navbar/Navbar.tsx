import { useState, type MouseEvent } from "react";
import { NavLink, useMatch, useNavigate } from "react-router";
import { getAvatar } from "../../data/avatars";
import { useProgress } from "../../hooks/useProgress";
import "./Navbar.css";

const LINKS = [
	{ to: "/", label: "Učna pot" },
	{ to: "/nagrade", label: "Nagrade" },
];

function Navbar() {
	const navigate = useNavigate();
	const { user } = useProgress();
	const inGame = useMatch("/lekcija/:lessonId/igra/*") !== null;
	// Kam želi uporabnik, dokler ne potrdi odhoda iz igre
	const [pendingPath, setPendingPath] = useState<string | null>(null);

	function handleClick(event: MouseEvent, to: string) {
		if (!inGame) return;
		event.preventDefault();
		setPendingPath(to);
	}

	function leaveGame() {
		if (pendingPath) navigate(pendingPath);
		setPendingPath(null);
	}

	return (
		<header className="navbar">
			<span className="navbar__brand">Stress</span>
			<nav className="navbar__links">
				{LINKS.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						// end: aktivna samo na "/", ne na vseh podstraneh
						end={link.to === "/"}
						className="navbar__link"
						data-ui-sound
						onClick={(event) => handleClick(event, link.to)}
					>
						{link.label}
					</NavLink>
				))}
			</nav>
			{user && (
				<NavLink
					to="/profil"
					className="navbar__avatar"
					data-ui-sound
					aria-label="Moj profil"
					title="Moj profil"
					onClick={(event) => handleClick(event, "/profil")}
				>
					{/* Okvir je na ovoju, img ne podpira ::before/::after */}
					<span
						className={`navbar__avatar-frame frame--${user.activeFrame}`}
					>
						<img src={getAvatar(user.avatar).image} alt="" />
					</span>
				</NavLink>
			)}

			{pendingPath !== null && (
				<div className="leave-dialog__backdrop">
					<div
						className="leave-dialog"
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="leave-title"
					>
						<h2 id="leave-title">Res želiš zapustiti igro?</h2>
						<p>Tvoj napredek v tej igri se ne bo shranil</p>
						<div className="leave-dialog__actions">
							<button
								className="leave-dialog__stay"
								data-ui-sound
								onClick={() => setPendingPath(null)}
								autoFocus
							>
								Ostani
							</button>
							<button
								className="leave-dialog__leave"
								data-ui-sound
								onClick={leaveGame}
							>
								Zapusti
							</button>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default Navbar;
