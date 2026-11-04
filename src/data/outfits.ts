import type { TobiOutfit } from "../components/mascot/Tobi";

// Tobijeva oblačila za trgovino, v enaki obliki kot teme in okvirji.
// Izris je v components/mascot/Tobi.tsx, cena je v školjkah (0 = brezplačno).
// Id-ji morajo biti različni od id-jev tem in okvirjev, ker se v trgovini iščejo skupaj.
export const OUTFITS = [
	{ id: "no-outfit", type: "outfit", name: "Brez oblačila", price: 0 },
	{ id: "summer", type: "outfit", name: "Summer", price: 60 },
	{ id: "winter", type: "outfit", name: "Winter", price: 60 },
	{ id: "christmas", type: "outfit", name: "Christmas", price: 80 },
	{ id: "pirate", type: "outfit", name: "Pirate", price: 80 },
	{ id: "ninja", type: "outfit", name: "Ninja", price: 100 },
	{ id: "captain", type: "outfit", name: "Captain", price: 100 },
	{ id: "astronaut", type: "outfit", name: "Astronaut", price: 120 },
	{ id: "wizard", type: "outfit", name: "Wizard", price: 150 },
] satisfies { id: TobiOutfit; type: "outfit"; name: string; price: number }[];

export const DEFAULT_OUTFIT: TobiOutfit = "no-outfit";

// Iz baze pride navaden niz, zato neznan ali manjkajoč id pomeni "brez oblačila"
export function getTobiOutfit(id?: string): TobiOutfit {
	return OUTFITS.find((outfit) => outfit.id === id)?.id ?? DEFAULT_OUTFIT;
}
