import { useCallback, useEffect, useRef, useState } from "react";

// Predvaja lokalne posnetke ElevenLabs; brez nadomestnega glasu brskalnika.
export function useRecordedAudio() {
	const currentAudio = useRef<HTMLAudioElement | null>(null);
	const [playingId, setPlayingId] = useState<string>();
	const [error, setError] = useState<string>();

	const stop = useCallback(() => {
		currentAudio.current?.pause();
		currentAudio.current = null;
		setPlayingId(undefined);
		setError(undefined);
	}, []);

	const play = useCallback((recordingId: string) => {
		currentAudio.current?.pause();
		const audio = new Audio(
			`${import.meta.env.BASE_URL}audio/${recordingId}.mp3`,
		);
		currentAudio.current = audio;
		setPlayingId(recordingId);
		setError(undefined);

		function finish(message?: string) {
			if (currentAudio.current !== audio) return;
			currentAudio.current = null;
			setPlayingId(undefined);
			setError(message);
		}
		const onError = () => finish("Posnetka ni bilo mogoče predvajati.");
		audio.addEventListener("ended", () => finish());
		audio.addEventListener("error", onError);
		void audio.play().catch(onError);
	}, []);

	useEffect(
		() => () => {
			currentAudio.current?.pause();
			currentAudio.current = null;
		},
		[],
	);

	return { play, stop, playingId, error };
}
