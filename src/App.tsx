import { useState } from "react";
import { logIn, register } from "./auth/auth";
import { useAuth } from "./auth/useAuth";
import AccountPage from "./pages/auth/AccountPage";
import AuthPage, { type AuthFormValues } from "./pages/auth/AuthPage";
import "./pages/auth/AuthPage.css";

import Profile from "./pages/profile/Profile";
import type { User } from "./models/user";

// Zaenkrat izmišljen uporabnik. Kasneje ga preberemo iz Firebase.
const TEST_USER: User = {
  id: "test-user",
  firstName: "Ana",
  lastName: "Novak",
  nickname: "Anči",
  avatar: "owl",
  email: "ana.novak@example.com",
  lessonProgress: {
    hello: { stars: 3, completedAt: "2026-10-20T15:30:00.000Z" },
    colours: { stars: 2, completedAt: "2026-10-22T16:10:00.000Z" },
    numbers: { stars: 3, completedAt: "2026-10-25T14:45:00.000Z" },
  },
};

function App() {
  const { user, loading, error } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  async function handleAuthenticate(values: AuthFormValues) {
    setSubmitting(true);
    try {
      if (values.mode === "register") {
        await register(values.displayName, values.email, values.password);
      } else {
        await logIn(values.email, values.password);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-layout">
      {loading ? (
        <p role="status">Nalaganje…</p>
      ) : error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : user && !submitting ? (
        <>
          <Profile user={TEST_USER} />
          <AccountPage key={user.uid} user={user} />
        </>
      ) : (
        <AuthPage submitting={submitting} onSubmit={handleAuthenticate} />
      )}
    </main>
  );
}

export default App;
