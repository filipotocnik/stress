import { useCallback, useEffect, useRef, useState } from "react";
import type { Word } from "../models/word";

export function useWordAudio() {
	const currentAudio = useRef<HTMLAudioElement | null>(null);
	const [playingWordId, setPlayingWordId] = useState<string>();
	const [error, setError] = useState<string>();

	const play = useCallback((word: Word) => {
		currentAudio.current?.pause();
		const audio = new Audio(
			`${import.meta.env.BASE_URL}audio/${word.id}.mp3`,
		);
		currentAudio.current = audio;
		setPlayingWordId(word.id);
		setError(undefined);

		function finish(message?: string) {
			if (currentAudio.current !== audio) return;
			currentAudio.current = null;
			setPlayingWordId(undefined);
			setError(message);
		}
		const onError = () =>
			finish(`Posnetka za „${word.en}“ ni bilo mogoče predvajati.`);
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

	return { play, playingWordId, error };
}
