import { mkdir, writeFile } from "node:fs/promises";

const directory = new URL("../public/audio/feedback/", import.meta.url);
const sampleRate = 22050;
const sounds = {
	tap: [{ frequency: 520, start: 0, duration: 0.045 }],
	next: [
		{ frequency: 587.33, start: 0, duration: 0.055 },
		{ frequency: 783.99, start: 0.025, duration: 0.065 },
	],
	complete: [
		{ frequency: 523.25, start: 0, duration: 0.16 },
		{ frequency: 659.25, start: 0.09, duration: 0.16 },
		{ frequency: 783.99, start: 0.18, duration: 0.16 },
		{ frequency: 1046.5, start: 0.27, duration: 0.25 },
	],
	correct: [
		{ frequency: 659.25, start: 0, duration: 0.14 },
		{ frequency: 880, start: 0.08, duration: 0.2 },
	],
	wrong: [
		{ frequency: 349.23, start: 0, duration: 0.12 },
		{ frequency: 293.66, start: 0.06, duration: 0.16 },
	],
};

await mkdir(directory, { recursive: true });

for (const [name, notes] of Object.entries(sounds)) {
	const duration = Math.max(
		...notes.map((note) => note.start + note.duration),
	);
	const samples = Math.ceil(duration * sampleRate);
	const audio = Buffer.alloc(44 + samples * 2);
	audio.write("RIFF", 0);
	audio.writeUInt32LE(audio.length - 8, 4);
	audio.write("WAVEfmt ", 8);
	audio.writeUInt32LE(16, 16);
	audio.writeUInt16LE(1, 20);
	audio.writeUInt16LE(1, 22);
	audio.writeUInt32LE(sampleRate, 24);
	audio.writeUInt32LE(sampleRate * 2, 28);
	audio.writeUInt16LE(2, 32);
	audio.writeUInt16LE(16, 34);
	audio.write("data", 36);
	audio.writeUInt32LE(samples * 2, 40);

	for (let i = 0; i < samples; i++) {
		let value = 0;
		for (const note of notes) {
			const time = i / sampleRate - note.start;
			if (time < 0 || time >= note.duration) continue;
			const envelope =
				Math.min(1, time / 0.008, (note.duration - time) / 0.03) *
				Math.exp(-time * 10);
			const phase = 2 * Math.PI * note.frequency * time;
			value +=
				(Math.sin(phase) + 0.12 * Math.sin(phase * 2)) * envelope * 0.4;
		}
		audio.writeInt16LE(
			Math.round(Math.max(-1, Math.min(1, value)) * 32767),
			44 + i * 2,
		);
	}

	await writeFile(new URL(`${name}.wav`, directory), audio);
}
