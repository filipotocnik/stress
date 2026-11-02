import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { words } from "../src/data/words.ts";

const VOICE_ID = "XrExE9yKIg1WjnnlVkGX";
const MODEL_ID = "eleven_v4";
const OUTPUT_FORMAT = "mp3_44100_128";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const audioDirectory = path.join(projectRoot, "public/audio");
const manifestFile = path.join(projectRoot, "scripts/audio-manifest.json");

function recordingSettings(word) {
	return {
		text: word.en,
		voiceId: VOICE_ID,
		modelId: MODEL_ID,
		outputFormat: OUTPUT_FORMAT,
	};
}

async function generateAudio(word, apiKey) {
	const response = await fetch(
		`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`,
		{
			method: "POST",
			headers: {
				"xi-api-key": apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: word.en, model_id: MODEL_ID }),
			signal: AbortSignal.timeout(120_000),
		},
	);
	if (!response.ok) {
		throw new Error(
			`ElevenLabs ${response.status}: ${await response.text()}`,
		);
	}
	const audio = Buffer.from(await response.arrayBuffer());
	if (audio.length === 0) throw new Error("ElevenLabs returned empty audio.");
	return audio;
}

async function main() {
	const { values } = parseArgs({
		options: {
			word: { type: "string" },
			all: { type: "boolean" },
			force: { type: "boolean" },
			check: { type: "boolean" },
		},
	});
	if (values.word && values.all) {
		throw new Error("Use either --word <id> or --all, not both.");
	}
	if (values.force && (values.check || (!values.word && !values.all))) {
		throw new Error(
			"Use --force with --word <id> or --all, without --check.",
		);
	}
	const selected =
		values.word !== undefined
			? words.filter((word) => word.id === values.word)
			: words;
	if (selected.length === 0) throw new Error(`Unknown word: ${values.word}`);

	const manifest = existsSync(manifestFile)
		? JSON.parse(await readFile(manifestFile, "utf8"))
		: {};
	const missing = [];
	const outdated = [];
	for (const word of selected) {
		if (!existsSync(path.join(audioDirectory, `${word.id}.mp3`))) {
			missing.push(word);
		} else {
			const expected = recordingSettings(word);
			if (
				!Object.entries(expected).every(
					([key, value]) => manifest[word.id]?.[key] === value,
				)
			) {
				outdated.push(word);
			}
		}
	}

	if (values.check) {
		console.log(
			`Recordings: ${selected.length - missing.length - outdated.length} up to date, ${outdated.length} outdated, ${missing.length} missing.`,
		);
		if (missing.length)
			console.log(
				`Missing: ${missing.map((word) => word.id).join(", ")}`,
			);
		if (outdated.length)
			console.log(
				`Outdated: ${outdated.map((word) => word.id).join(", ")}`,
			);
		if (missing.length || outdated.length) process.exitCode = 1;
		return;
	}
	if (outdated.length && !values.force) {
		console.log(
			`Skipping ${outdated.length} outdated recordings. Replace them with --word <id> --force or --all --force.`,
		);
	}

	const pending = values.force ? selected : missing;
	const skipped = selected.length - pending.length;
	if (pending.length === 0) {
		console.log(
			`Generated 0 recordings; skipped ${skipped} existing recordings.`,
		);
		return;
	}

	const envFile = path.join(projectRoot, ".env.local");
	if (existsSync(envFile)) process.loadEnvFile(envFile);
	const apiKey = process.env.ELEVENLABS_API_KEY;
	if (!apiKey)
		throw new Error(
			"Set ELEVENLABS_API_KEY in .env.local or the environment.",
		);

	const characters = pending.reduce((sum, word) => sum + word.en.length, 0);
	console.log(
		`Generating ${pending.length} recordings (${characters} characters)...`,
	);
	await mkdir(audioDirectory, { recursive: true });
	let generated = 0;
	for (const word of pending) {
		try {
			const audio = await generateAudio(word, apiKey);
			await writeFile(path.join(audioDirectory, `${word.id}.mp3`), audio);
			manifest[word.id] = recordingSettings(word);
			const sorted = Object.fromEntries(
				Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
			);
			await writeFile(
				manifestFile,
				`${JSON.stringify(sorted, null, "\t")}\n`,
			);
			generated++;
			console.log(
				`  ${generated}/${pending.length} ${word.id} (${word.en})`,
			);
		} catch (error) {
			throw new Error(
				`Failed to generate "${word.id}" after ${generated} completed recordings: ${error.message}`,
				{ cause: error },
			);
		}
	}
	console.log(
		`Generated ${generated} recordings in public/audio; skipped ${skipped} existing recordings.`,
	);
}

main().catch((error) => {
	console.error(error.message);
	process.exitCode = 1;
});
