import { FirebaseError } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
	type User,
} from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	runTransaction,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { AVATARS } from "../data/avatars";
import { auth, db } from "../firebase";
import type {
	LessonProgress,
	User as AppUser,
	UserProfile,
} from "../models/user";

export async function ensureUserProfile(
	user: User,
	newProfile?: UserProfile,
): Promise<UserProfile> {
	const reference = doc(db, "users", user.uid);

	return runTransaction(db, async (transaction) => {
		const snapshot = await transaction.get(reference);
		if (snapshot.exists()) {
			const data = snapshot.data();
			// starejši računi nimajo vseh polj
			return {
				firstName: (data.firstName as string | undefined) ?? "",
				lastName: (data.lastName as string | undefined) ?? "",
				displayName: (data.displayName as string | undefined) ?? "",
				avatar: (data.avatar as string | undefined) ?? AVATARS[0].id,
			};
		}

		const profile = newProfile ?? {
			firstName: "",
			lastName: "",
			displayName: user.displayName || "",
			avatar: AVATARS[0].id,
		};
		transaction.set(reference, {
			...profile,
			createdAt: serverTimestamp(),
		});
		return profile;
	});
}

export async function loadUser(user: User): Promise<AppUser> {
	const profile = await ensureUserProfile(user);
	const snapshot = await getDocs(
		collection(db, "users", user.uid, "progress"),
	);

	// id dokumenta je id lekcije
	const lessonProgress: Record<string, LessonProgress> = {};
	for (const progress of snapshot.docs) {
		lessonProgress[progress.id] = progress.data() as LessonProgress;
	}

	return {
		...profile,
		id: user.uid,
		email: user.email ?? "",
		lessonProgress,
	};
}

export async function register(
	profile: UserProfile,
	email: string,
	password: string,
) {
	const { user } = await createUserWithEmailAndPassword(
		auth,
		email.trim(),
		password,
	);
	await updateProfile(user, { displayName: profile.displayName });
	await ensureUserProfile(user, profile);
}

export async function updateUser(user: User, profile: UserProfile) {
	await updateDoc(doc(db, "users", user.uid), { ...profile });
	// uporabniško ime je shranjeno tudi v Firebase Auth
	if (user.displayName !== profile.displayName) {
		await updateProfile(user, { displayName: profile.displayName });
	}
}

export async function logIn(email: string, password: string) {
	await signInWithEmailAndPassword(auth, email.trim(), password);
}

export function logOut() {
	return signOut(auth);
}

export function getAuthErrorMessage(error: unknown): string {
	if (!(error instanceof FirebaseError)) {
		return "Prišlo je do napake. Poskusi znova.";
	}

	switch (error.code) {
		case "auth/invalid-credential":
		case "auth/user-not-found":
		case "auth/wrong-password":
			return "E-poštni naslov ali geslo ni pravilno.";
		case "auth/email-already-in-use":
			return "Račun s tem e-poštnim naslovom že obstaja. Poskusi se prijaviti.";
		case "auth/invalid-email":
			return "Vnesi veljaven e-poštni naslov.";
		case "auth/weak-password":
		case "auth/password-does-not-meet-requirements":
			return "Izberi močnejše geslo, ki izpolnjuje zahteve za račun.";
		case "auth/too-many-requests":
			return "Preveč poskusov. Malo počakaj in poskusi znova.";
		case "auth/network-request-failed":
		case "unavailable":
			return "Povezava ni uspela. Preveri internetno povezavo in poskusi znova.";
		case "auth/user-disabled":
			return "Ta račun je onemogočen.";
		default:
			return "Zahteve ni bilo mogoče dokončati. Poskusi znova.";
	}
}
