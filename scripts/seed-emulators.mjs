import { initializeApp, deleteApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  doc,
  getDocFromServer,
  getFirestore,
  serverTimestamp,
  setDoc,
  terminate,
} from "firebase/firestore";

const email = "test@example.com";
const password = "test-password";
const app = initializeApp({ apiKey: "demo-api-key", projectId: "demo-stress" });
const auth = getAuth(app);
const db = getFirestore(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
connectFirestoreEmulator(db, "127.0.0.1", 8080);

const timeout = setTimeout(() => {
  console.error("Seed timed out. Start npm run emulators and try again.");
  process.exit(1);
}, 20_000);

try {
  let credential;
  try {
    credential = await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code !== "auth/email-already-in-use") throw error;
    credential = await signInWithEmailAndPassword(auth, email, password);
  }

  const profile = doc(db, "users", credential.user.uid);
  if (!(await getDocFromServer(profile)).exists()) {
    await setDoc(profile, {
      displayName: "Test User",
      createdAt: serverTimestamp(),
    });
  }
  console.log(`Local test user ready: ${email} / ${password}`);
} catch (error) {
  console.error(
    "Could not seed local emulators. Is npm run emulators running?",
    error,
  );
  process.exitCode = 1;
} finally {
  await terminate(db);
  await deleteApp(app);
  clearTimeout(timeout);
}
