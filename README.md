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
- `npm run format` — format files.
