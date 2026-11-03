import { doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import {
	DEFAULT_FRAME,
	DEFAULT_THEME,
	getShopItem,
	isOwned,
	type ShopItem,
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
	};
}

// Polje, v katerem je shranjena izbrana tema ali okvir
function activeField(item: ShopItem) {
	return item.type === "theme" ? "activeTheme" : "activeFrame";
}

// Kupi temo ali okvir in ga takoj uporabi
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
			[activeField(item)]: itemId,
		});
	});
}

// Uporabi že kupljeno ali brezplačno temo ali okvir
// Ne "useItem", ker ESLint imena use... obravnava kot React hook
export async function applyItem(uid: string, itemId: string): Promise<void> {
	const reference = doc(db, "users", uid);
	const snapshot = await getDoc(reference);
	const ownedItems =
		(snapshot.data()?.ownedItems as string[] | undefined) ?? [];

	const item = getShopItem(itemId);
	if (!item || !isOwned(item, ownedItems)) throw new Error("not-owned");

	await updateDoc(reference, { [activeField(item)]: itemId });
}
