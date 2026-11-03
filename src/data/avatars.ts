// Slike: OpenMoji (https://openmoji.org), CC BY-SA 4.0
import owl from "../assets/avatars/owl.svg";
import dog from "../assets/avatars/dog.svg";
import cat from "../assets/avatars/cat.svg";
import fox from "../assets/avatars/fox.svg";
import panda from "../assets/avatars/panda.svg";
import frog from "../assets/avatars/frog.svg";
import lion from "../assets/avatars/lion.svg";
import rabbit from "../assets/avatars/rabbit.svg";
import chick from "../assets/avatars/chick.svg";
import koala from "../assets/avatars/koala.svg";
import otter from "../assets/avatars/otter.svg";
import bat from "../assets/avatars/bat.svg";
import parrot from "../assets/avatars/parrot.svg";
import jellyfish from "../assets/avatars/jellyfish.svg";
import peacock from "../assets/avatars/peacock.svg";
import orca from "../assets/avatars/orca.svg";
import trex from "../assets/avatars/trex.svg";
import dragon from "../assets/avatars/dragon.svg";
import unicorn from "../assets/avatars/unicorn.svg";

export interface Avatar {
	id: string;
	name: string;
	image: string;
	requiredStars: number; // skupno število zvezdic za odklep, 0 = brezplačen
}

// Najprej brezplačni, nato po številu zvezdic naraščajoče
export const AVATARS: Avatar[] = [
	{ id: "owl", name: "Owl", image: owl, requiredStars: 0 },
	{ id: "dog", name: "Dog", image: dog, requiredStars: 0 },
	{ id: "cat", name: "Cat", image: cat, requiredStars: 0 },
	{ id: "rabbit", name: "Rabbit", image: rabbit, requiredStars: 0 },
	{ id: "frog", name: "Frog", image: frog, requiredStars: 2 },
	{ id: "fox", name: "Fox", image: fox, requiredStars: 3 },
	{ id: "panda", name: "Panda", image: panda, requiredStars: 4 },
	{ id: "lion", name: "Lion", image: lion, requiredStars: 5 },
	{ id: "chick", name: "Chick", image: chick, requiredStars: 6 },
	{ id: "koala", name: "Koala", image: koala, requiredStars: 7 },
	{ id: "otter", name: "Otter", image: otter, requiredStars: 8 },
	{ id: "bat", name: "Bat", image: bat, requiredStars: 10 },
	{ id: "parrot", name: "Parrot", image: parrot, requiredStars: 12 },
	{
		id: "jellyfish",
		name: "Jellyfish",
		image: jellyfish,
		requiredStars: 14,
	},
	{ id: "peacock", name: "Peacock", image: peacock, requiredStars: 17 },
	{ id: "orca", name: "Orca", image: orca, requiredStars: 20 },
	{ id: "trex", name: "T-rex", image: trex, requiredStars: 23 },
	{ id: "dragon", name: "Dragon", image: dragon, requiredStars: 26 },
	{ id: "unicorn", name: "Unicorn", image: unicorn, requiredStars: 30 },
];

export function isAvatarUnlocked(avatar: Avatar, totalStars: number): boolean {
	return totalStars >= avatar.requiredStars;
}

// Koliko zvezdic še manjka do odklepa
export function getMissingStars(avatar: Avatar, totalStars: number): number {
	return Math.max(0, avatar.requiredStars - totalStars);
}

// Poišče avatar po id-ju. Če ga ni, vrne sovo.
export function getAvatar(id: string): Avatar {
	return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
