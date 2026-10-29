import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export interface UserProfile {
  displayName: string;
}

export async function ensureUserProfile(user: User): Promise<UserProfile> {
  const reference = doc(db, "users", user.uid);

  return runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(reference);
    if (snapshot.exists()) {
      return { displayName: snapshot.data().displayName as string };
    }

    const profile = { displayName: user.displayName || "" };
    transaction.set(reference, {
      ...profile,
      createdAt: serverTimestamp(),
    });
    return profile;
  });
}

export async function register(
  displayName: string,
  email: string,
  password: string,
) {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  await updateProfile(user, { displayName: displayName.trim() });
  await ensureUserProfile(user);
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
