import { useCallback, useEffect, useRef, useState } from "react";

// Predvaja lokalne posnetke ElevenLabs; brez nadomestnega glasu brskalnika.
export function useRecordedAudio() {
	const currentAudio = useRef<HTMLAudioElement | null>(null);
	const finishTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined,
	);
	const [playingId, setPlayingId] = useState<string>();
	const [error, setError] = useState<string>();

	const stop = useCallback(() => {
		clearTimeout(finishTimer.current);
		finishTimer.current = undefined;
		currentAudio.current?.pause();
		currentAudio.current = null;
		setPlayingId(undefined);
		setError(undefined);
	}, []);

	const play = useCallback((recordingId: string, onFinished?: () => void) => {
		clearTimeout(finishTimer.current);
		finishTimer.current = undefined;
		currentAudio.current?.pause();
		const audio = new Audio(
			`${import.meta.env.BASE_URL}audio/${recordingId}.mp3`,
		);
		currentAudio.current = audio;
		setPlayingId(recordingId);
		setError(undefined);

		function finish(message?: string) {
			if (currentAudio.current !== audio) return;
			clearTimeout(finishTimer.current);
			finishTimer.current = undefined;
			currentAudio.current = null;
			audio.pause();
			setPlayingId(undefined);
			setError(message);
			onFinished?.();
		}
		const onError = () => finish("Posnetka ni bilo mogoče predvajati.");
		audio.addEventListener("ended", () => finish());
		audio.addEventListener("error", onError);
		// Zataknjen posnetek ne sme za vedno zadržati zaključnega zaslona.
		if (onFinished) finishTimer.current = setTimeout(onError, 15_000);
		void audio.play().catch(onError);
	}, []);

	useEffect(
		() => () => {
			clearTimeout(finishTimer.current);
			currentAudio.current?.pause();
			currentAudio.current = null;
		},
		[],
	);

	return { play, stop, playingId, error };
}
