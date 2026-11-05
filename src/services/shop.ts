import { doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { DEFAULT_OUTFIT } from "../data/outfits";
import {
	ACTIVE_FIELD,
	DEFAULT_FRAME,
	DEFAULT_THEME,
	getShopItem,
	isOwned,
} from "../data/shop";
import { db } from "../firebase";
import type { ShopState } from "../models/user";

// Prebere stanje trgovine iz users/{uid}, manjkajoča polja dobijo privzete vrednosti
export async function loadShop(uid: string): Promise<ShopState> {
	const snapshot = await getDoc(doc(db, "users", uid));
	const data = snapshot.data() ?? {};

	return {
		shells: (data.shells as number | undefined) ?? 0,
		ownedItems: (data.ownedItems as string[] | undefined) ?? [],
		activeTheme: (data.activeTheme as string | undefined) ?? DEFAULT_THEME,
		activeFrame: (data.activeFrame as string | undefined) ?? DEFAULT_FRAME,
		activeOutfit:
			(data.activeOutfit as string | undefined) ?? DEFAULT_OUTFIT,
	};
}

// Kupi izdelek in ga takoj uporabi
// Transakcija prepreči, da bi dva hkratna nakupa porabila iste školjke
export async function buyItem(uid: string, itemId: string): Promise<void> {
	const reference = doc(db, "users", uid);

	await runTransaction(db, async (transaction) => {
		const snapshot = await transaction.get(reference);
		const data = snapshot.data() ?? {};
		const shells = (data.shells as number | undefined) ?? 0;
		const ownedItems = (data.ownedItems as string[] | undefined) ?? [];

		const item = getShopItem(itemId);
		if (!item) throw new Error("unknown-item");
		if (isOwned(item, ownedItems)) throw new Error("already-owned");
		if (shells < item.price) throw new Error("not-enough-shells");

		transaction.update(reference, {
			shells: shells - item.price,
			ownedItems: [...ownedItems, itemId],
			[ACTIVE_FIELD[item.type]]: itemId,
		});
	});
}

// Uporabi že kupljen ali brezplačen izdelek
// Ne "useItem", ker ESLint imena use... obravnava kot React hook
export async function applyItem(uid: string, itemId: string): Promise<void> {
	const reference = doc(db, "users", uid);
	const snapshot = await getDoc(reference);
	const ownedItems =
		(snapshot.data()?.ownedItems as string[] | undefined) ?? [];

	const item = getShopItem(itemId);
	if (!item || !isOwned(item, ownedItems)) throw new Error("not-owned");

	await updateDoc(reference, { [ACTIVE_FIELD[item.type]]: itemId });
}
