import { useState, type MouseEvent } from "react";
import { NavLink, useMatch, useNavigate } from "react-router";
import "./Navbar.css";

const LINKS = [
	{ to: "/", label: "Učna pot" },
	{ to: "/lekcije", label: "Moje lekcije" },
	{ to: "/profil", label: "Profil" },
];

function Navbar() {
	const navigate = useNavigate();
	const inLesson = useMatch("/lekcija/*") !== null;
	// Kam želi uporabnik, dokler ne potrdi odhoda iz lekcije
	const [pendingPath, setPendingPath] = useState<string | null>(null);

	function handleClick(event: MouseEvent, to: string) {
		if (!inLesson) return;
		event.preventDefault();
		setPendingPath(to);
	}

	function leaveLesson() {
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
						onClick={(event) => handleClick(event, link.to)}
					>
						{link.label}
					</NavLink>
				))}
			</nav>

			{pendingPath !== null && (
				<div className="leave-dialog__backdrop">
					<div
						className="leave-dialog"
						role="alertdialog"
						aria-modal="true"
						aria-labelledby="leave-title"
					>
						<h2 id="leave-title">Res želiš zapustiti lekcijo?</h2>
						<div className="leave-dialog__actions">
							<button
								className="leave-dialog__stay"
								onClick={() => setPendingPath(null)}
								autoFocus
							>
								Ostani
							</button>
							<button
								className="leave-dialog__leave"
								onClick={leaveLesson}
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
