// Poiščemo britanski glas. Brskalnik sicer vzame privzetega (lahko slovenskega).
// Najprej poskusimo kakovostnejše glasove (Google, Microsoft "Natural"/"Online").
function findBritishVoice() {
	const voices = speechSynthesis.getVoices();
	const british = voices.filter(
		(voice) => voice.lang.replace("_", "-") === "en-GB",
	);

	return (
		british.find((voice) => /natural|online|google/i.test(voice.name)) ??
		british[0] ??
		voices.find((voice) => voice.lang.startsWith("en"))
	);
}

// Brskalnik prebere besedilo na glas
export function speak(text: string) {
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = "en-GB";
	utterance.voice = findBritishVoice() ?? null;
	utterance.rate = 0.9; // malo počasneje, da otroci lažje slišijo
	speechSynthesis.cancel();
	speechSynthesis.speak(utterance);
}
