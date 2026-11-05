import { useState } from "react";
import type { TobiMood } from "../components/mascot/Tobi";
import { pickGameMessage, type GameEvent } from "../data/tobi-messages";

const MOODS: Record<GameEvent, TobiMood> = {
	start: "happy",
	correct: "happy",
	streak: "cheer",
	wrong: "encourage", // nikoli "sad": otrok ne sme dobiti občutka, da je Tobi razočaran
};

// Pohvala po vsakih toliko pravilnih odgovorih zapored
const STREAK_LENGTH = 2;

// Tobijev odziv na potek igre. Niz zaporednih odgovorov vpliva samo na prikaz,
// zato ni v gameSessionReducer, ki skrbi za točkovanje.
export function useTobiReaction() {
	const [reaction, setReaction] = useState(() => ({
		mood: MOODS.start,
		message: pickGameMessage("start"),
		streak: 0,
	}));

	function onAnswer(correct: boolean) {
		const streak = correct ? reaction.streak + 1 : 0;
		let event: GameEvent = "wrong";
		if (correct) {
			event = streak % STREAK_LENGTH === 0 ? "streak" : "correct";
		}
		setReaction({
			mood: MOODS[event],
			message: pickGameMessage(event, reaction.message),
			streak,
		});
	}

	return { mood: reaction.mood, message: reaction.message, onAnswer };
}
