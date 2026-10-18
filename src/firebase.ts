import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALjnXhJKt4gSstATFubTjPuii-RD5gQMw",
  authDomain: "stress-2ec0b.firebaseapp.com",
  projectId: "stress-2ec0b",
  storageBucket: "stress-2ec0b.firebasestorage.app",
  messagingSenderId: "448806278228",
  appId: "1:448806278228:web:d24a3ec72584d4f4af09c1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
