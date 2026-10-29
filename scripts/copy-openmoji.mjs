import { copyFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// script for saving all openmojis from dataFiles to public/openmoji
// emoji has to be written as: openmoji("1F384")

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

const dataFiles = [
    "src/data/words.ts",
    "src/data/lessons.ts",
];

const codes = new Set();

for (const file of dataFiles) {
    const source = await readFile(
        path.join(projectRoot, file),
        "utf8",
    );

    for (const match of source.matchAll(/openmoji\("([A-F0-9-]+)"\)/g)) {
        codes.add(match[1]);
    }
}

const sourceDirectory = path.join(
    projectRoot,
    "node_modules",
    "openmoji",
    "color",
    "svg",
);

const destinationDirectory = path.join(
    projectRoot,
    "public",
    "openmoji",
);

await mkdir(destinationDirectory, { recursive: true });

for (const code of codes) {
    const filename = `${code}.svg`;

    try {
        await copyFile(
            path.join(sourceDirectory, filename),
            path.join(destinationDirectory, filename),
        );
    } catch (error) {
        throw new Error(
            `Could not copy ${filename}. Check the installed OpenMoji package.`,
            { cause: error },
        );
    }
}

console.log(`Copied ${codes.size} OpenMoji SVGs to public/openmoji.`);