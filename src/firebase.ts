import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const emulatorSetting = import.meta.env.VITE_USE_FIREBASE_EMULATORS;
if (emulatorSetting !== "true" && emulatorSetting !== "false") {
  throw new Error("VITE_USE_FIREBASE_EMULATORS must be true or false.");
}
const useEmulators = emulatorSetting === "true";

const firebaseConfig = {
  apiKey: "AIzaSyALjnXhJKt4gSstATFubTjPuii-RD5gQMw",
  authDomain: "stress-2ec0b.firebaseapp.com",
  projectId: "stress-2ec0b",
  storageBucket: "stress-2ec0b.firebasestorage.app",
  messagingSenderId: "448806278228",
  appId: "1:448806278228:web:d24a3ec72584d4f4af09c1",
};

export const app = initializeApp(
  useEmulators
    ? {
        apiKey: "demo-api-key",
        projectId: "demo-stress",
        authDomain: "demo-stress.firebaseapp.com",
      }
    : firebaseConfig,
);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (useEmulators) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
