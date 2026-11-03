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

## Recorded audio

All speech uses local [ElevenLabs](https://elevenlabs.io) recordings, with no
browser TTS fallback. Vocabulary uses `public/audio/<word-id>.mp3`; completed
grammar sentences use `public/audio/grammar/<lesson-id>/<question-id>.mp3`.
Sentence text comes from each grammar question with its correct answer filled in.
Set `ELEVENLABS_API_KEY` in `.env.local`, then run:

```sh
npm run audio:generate
```

Only missing recordings are generated. To replace existing recordings, use
`npm run audio:generate -- --word red --force`,
`npm run audio:generate -- --sentence colours/colours-1 --force`, or `--all --force`.
Without `--force`, `--word` and `--sentence` also let you generate a single missing
recording. The default checks/generates both vocabulary and grammar recordings.
Change `VOICE_ID` near the top of `scripts/generate-audio.mjs` to switch voices.

`npm run audio:check` reports missing recordings or changes to the text, voice,
or model without calling the API (exit status 1 if anything needs updating).
The settings for each recording are saved in `scripts/audio-manifest.json`.

## Checks

- `npm run check` — formatting, linting, and build.
- `npm run format` — format files.
