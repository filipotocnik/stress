export type ShopItemType = "theme" | "frame";

export interface ShopItem {
	id: string;
	type: ShopItemType;
	name: string;
	price: number; // v školjkah, 0 = brezplačno
}

// Barve tem so v styles/themes.css
export const THEMES: ShopItem[] = [
	{ id: "ocean", type: "theme", name: "Ocean", price: 0 },
	{ id: "lagoon", type: "theme", name: "Lagoon", price: 80 },
	{ id: "tropical", type: "theme", name: "Tropical", price: 100 },
	{ id: "coral", type: "theme", name: "Coral", price: 100 },
	{ id: "sunset", type: "theme", name: "Sunset", price: 120 },
	{ id: "deep", type: "theme", name: "Deep", price: 150 },
];

// Videz okvirjev je v styles/frames.css
export const FRAMES: ShopItem[] = [
	{ id: "none", type: "frame", name: "Brez okvirja", price: 0 },
	{ id: "bubbles", type: "frame", name: "Bubbles", price: 30 },
	{ id: "shells", type: "frame", name: "Shells", price: 40 },
	{ id: "pearls", type: "frame", name: "Pearls", price: 50 },
	{ id: "treasure", type: "frame", name: "Treasure", price: 60 },
	{ id: "rainbow", type: "frame", name: "Rainbow", price: 80 },
];

export const DEFAULT_THEME = "ocean";
export const DEFAULT_FRAME = "none";

// Poišče temo ali okvir po id-ju
export function getShopItem(id: string): ShopItem | undefined {
	return [...THEMES, ...FRAMES].find((item) => item.id === id);
}

// Brezplačne stvari ima vsak, ostale le, če jih je kupil
export function isOwned(item: ShopItem, ownedItems: string[]): boolean {
	return item.price === 0 || ownedItems.includes(item.id);
}
