import { useState, type SubmitEvent } from "react";
import { getAuthErrorMessage } from "../../auth/auth";

export interface AuthFormValues {
	mode: "login" | "register";
	displayName: string;
	email: string;
	password: string;
}

interface AuthPageProps {
	submitting: boolean;
	onSubmit: (values: AuthFormValues) => Promise<void>;
}

export default function AuthPage({ submitting, onSubmit }: AuthPageProps) {
	const [mode, setMode] = useState<AuthFormValues["mode"]>("login");
	const [error, setError] = useState("");
	const isRegistration = mode === "register";

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitting) return;

		const data = new FormData(event.currentTarget);
		const displayName = String(data.get("displayName") ?? "").trim();
		if (isRegistration && !displayName) {
			setError("Vnesi svoje ime.");
			return;
		}

		setError("");
		try {
			await onSubmit({
				mode,
				displayName,
				email: String(data.get("email") ?? ""),
				password: String(data.get("password") ?? ""),
			});
		} catch (error) {
			setError(getAuthErrorMessage(error));
		}
	}

	function switchMode() {
		setMode(isRegistration ? "login" : "register");
		setError("");
	}

	return (
		<section className="auth-card" aria-labelledby="auth-title">
			<h1 id="auth-title">
				{isRegistration ? "Ustvari račun" : "Dobrodošli nazaj"}
			</h1>
			<p className="auth-description">
				{isRegistration
					? "Začni svojo poučno pustolovščino."
					: "Prijavi se in nadaljuj z učenjem."}
			</p>

			<form key={mode} onSubmit={handleSubmit} aria-busy={submitting}>
				<fieldset disabled={submitting} className="auth-fields">
					{isRegistration && (
						<label className="auth-field">
							Ime
							<input
								name="displayName"
								autoComplete="nickname"
								required
								maxLength={80}
							/>
						</label>
					)}
					<label className="auth-field">
						E-pošta
						<input
							name="email"
							type="email"
							autoComplete="email"
							required
						/>
					</label>
					<label className="auth-field">
						Geslo
						<input
							name="password"
							type="password"
							autoComplete={
								isRegistration
									? "new-password"
									: "current-password"
							}
							minLength={isRegistration ? 6 : undefined}
							aria-describedby={
								isRegistration ? "password-hint" : undefined
							}
							required
						/>
					</label>
					{isRegistration && (
						<p id="password-hint" className="auth-hint">
							Uporabi vsaj 6 znakov.
						</p>
					)}
					{error && (
						<p className="auth-error" role="alert">
							{error}
						</p>
					)}
					<button className="auth-button" type="submit">
						{submitting
							? "Počakaj…"
							: isRegistration
								? "Ustvari račun"
								: "Prijavi se"}
					</button>
				</fieldset>
			</form>

			<p className="auth-switch">
				{isRegistration ? "Že imaš račun?" : "Še nimaš računa?"}{" "}
				<button
					className="auth-link"
					type="button"
					onClick={switchMode}
					disabled={submitting}
				>
					{isRegistration ? "Prijavi se" : "Registriraj se"}
				</button>
			</p>
		</section>
	);
}
