import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { registerHooks } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { getGrammarAudioId } from "../src/utils/audio.ts";

const VOICE_ID = "XrExE9yKIg1WjnnlVkGX";
const MODEL_ID = "eleven_v4";
const OUTPUT_FORMAT = "mp3_44100_128";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const audioDirectory = path.join(projectRoot, "public/audio");
const manifestFile = path.join(projectRoot, "scripts/audio-manifest.json");

const sourceImports = registerHooks({
	resolve(specifier, context, nextResolve) {
		if (specifier.startsWith(".") && !path.extname(specifier)) {
			return nextResolve(`${specifier}.ts`, context);
		}
		return nextResolve(specifier, context);
	},
});
let words, lessons;
try {
	({ words } = await import("../src/data/words.ts"));
	({ lessons } = await import("../src/data/lessons/index.ts"));
} finally {
	sourceImports.deregister();
}

const recordings = [
	...words.map((word) => ({ id: word.id, text: word.en })),
	...lessons.flatMap((lesson) =>
		lesson.content.grammar.map((question) => ({
			id: getGrammarAudioId(lesson.id, question.id),
			text: question.sentence.replace("___", question.correctAnswer),
		})),
	),
];

function recordingSettings(recording) {
	return {
		text: recording.text,
		voiceId: VOICE_ID,
		modelId: MODEL_ID,
		outputFormat: OUTPUT_FORMAT,
	};
}

async function generateAudio(recording, apiKey) {
	const response = await fetch(
		`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=${OUTPUT_FORMAT}`,
		{
			method: "POST",
			headers: {
				"xi-api-key": apiKey,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text: recording.text, model_id: MODEL_ID }),
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
			sentence: { type: "string" },
			all: { type: "boolean" },
			force: { type: "boolean" },
			check: { type: "boolean" },
		},
	});
	if (
		[
			values.word !== undefined,
			values.sentence !== undefined,
			values.all,
		].filter(Boolean).length > 1
	) {
		throw new Error(
			"Use only one of --word <id>, --sentence <lesson/question>, or --all.",
		);
	}
	if (
		values.force &&
		(values.check || (!values.word && !values.sentence && !values.all))
	) {
		throw new Error(
			"Use --force with --word <id>, --sentence <lesson/question>, or --all, without --check.",
		);
	}
	const selectedId =
		values.word !== undefined
			? values.word
			: values.sentence !== undefined
				? `grammar/${values.sentence}`
				: undefined;
	const selected =
		selectedId !== undefined
			? recordings.filter((recording) => recording.id === selectedId)
			: recordings;
	if (selected.length === 0)
		throw new Error(`Unknown recording: ${selectedId}`);

	let manifest = {};
	try {
		if (existsSync(manifestFile)) {
			manifest = JSON.parse(await readFile(manifestFile, "utf8"));
		}
	} catch (error) {
		throw new Error(`Cannot read audio manifest: ${error.message}`, {
			cause: error,
		});
	}
	const missing = [];
	const outdated = [];
	for (const recording of selected) {
		if (!existsSync(path.join(audioDirectory, `${recording.id}.mp3`))) {
			missing.push(recording);
		} else {
			const expected = recordingSettings(recording);
			if (
				!Object.entries(expected).every(
					([key, value]) => manifest[recording.id]?.[key] === value,
				)
			) {
				outdated.push(recording);
			}
		}
	}

	if (values.check) {
		console.log(
			`Recordings: ${selected.length - missing.length - outdated.length} up to date, ${outdated.length} outdated, ${missing.length} missing.`,
		);
		if (missing.length)
			console.log(
				`Missing: ${missing.map((recording) => recording.id).join(", ")}`,
			);
		if (outdated.length)
			console.log(
				`Outdated: ${outdated.map((recording) => recording.id).join(", ")}`,
			);
		if (missing.length || outdated.length) process.exitCode = 1;
		return;
	}
	if (outdated.length && !values.force) {
		console.log(
			`Skipping ${outdated.length} outdated recordings. Replace them with --word <id> --force, --sentence <lesson/question> --force, or --all --force.`,
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

	const characters = pending.reduce(
		(sum, recording) => sum + recording.text.length,
		0,
	);
	console.log(
		`Generating ${pending.length} recordings (${characters} characters)...`,
	);
	let generated = 0;
	for (const recording of pending) {
		try {
			const audio = await generateAudio(recording, apiKey);
			const audioFile = path.join(audioDirectory, `${recording.id}.mp3`);
			await mkdir(path.dirname(audioFile), { recursive: true });
			await writeFile(audioFile, audio);
			manifest[recording.id] = recordingSettings(recording);
			const sorted = Object.fromEntries(
				Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
			);
			await writeFile(
				manifestFile,
				`${JSON.stringify(sorted, null, "\t")}\n`,
			);
			generated++;
			console.log(
				`  ${generated}/${pending.length} ${recording.id} (${recording.text})`,
			);
		} catch (error) {
			throw new Error(
				`Failed to generate "${recording.id}" after ${generated} completed recordings: ${error.message}`,
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
