# Stress

## Development

Requires Node.js 24, npm 11, and Java 21.

```sh
npm ci       # once after cloning, or when dependencies change
npm run dev
```

This starts Auth and Firestore emulators, creates the test user, and starts the
app in one terminal. Stop with Ctrl+C; emulator data is saved for next time.

- Test user: `test@example.com` / `test-password`
- Emulator UI: <http://127.0.0.1:4000>
- Reset data: stop the app and delete `.firebase/emulator-data/`.

## Firebase environment

`.env.development` selects local emulators; `.env.production` selects live
Firebase. To override either, set `VITE_USE_FIREBASE_EMULATORS=true` (local) or
`false` (live) in `.env.local`, then restart Vite or rebuild.

To run just the app without starting emulators, use `npm run dev:app`.

## Checks

- `npm run check` — formatting, linting, and build.
- `npm run test:game-stars` — per-game star regression tests (Node.js 24).
- `npm run format` — format files.

## Game stars

`getGameStars(result)` in `src/game/scoring.ts` derives 1–3 stars from a
finished matching, grammar or listening result: at least 90% first-try accuracy
gets 3, at least 70% gets 2, otherwise 1. Pass the current attempt for result
feedback or the saved best result for lesson cards. For unfinished games, show
an unplayed state rather than calling this helper without a result.

Memory returns `null`: its UI should omit stars entirely. Stars are not stored
on game results, so existing saved results need no migration. Lesson stars still
use the average best accuracy across the three scored games, require all four
games to finish, and remain the only source of XP.
