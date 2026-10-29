import { useState } from "react";
import { logIn, register } from "./auth/auth";
import { useAuth } from "./auth/useAuth";
import AuthPage, { type AuthFormValues } from "./pages/auth/AuthPage";
import "./pages/auth/AuthPage.css";
import Profile from "./pages/profile/Profile";

function App() {
  const { user, loading, error } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  async function handleAuthenticate(values: AuthFormValues) {
    setSubmitting(true);
    try {
      if (values.mode === "register") {
        const { firstName, lastName, displayName, avatar } = values;
        await register(
          { firstName, lastName, displayName, avatar },
          values.email,
          values.password,
        );
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
        <Profile key={user.uid} user={user} />
      ) : (
        <AuthPage submitting={submitting} onSubmit={handleAuthenticate} />
      )}
    </main>
  );
}

export default App;
