import { doc, getDoc } from "firebase/firestore";
import { DEFAULT_FRAME, DEFAULT_THEME } from "../data/shop";
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
