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
  return <Profile user={TEST_USER} />;
}

export default App;
