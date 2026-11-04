import { useCallback, useEffect, useRef } from "react";

type FeedbackSound = boolean | "tap" | "next" | "complete";

export function useFeedbackAudio() {
	const currentAudio = useRef<HTMLAudioElement | null>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	const stop = useCallback(() => {
		clearTimeout(timer.current);
		timer.current = undefined;
		const audio = currentAudio.current;
		currentAudio.current = null;
		audio?.pause();
	}, []);

	const play = useCallback(
		(sound: FeedbackSound, onEnded?: () => void, followUpDelay = 0) => {
			clearTimeout(timer.current);
			currentAudio.current?.pause();
			const name =
				typeof sound === "boolean"
					? sound
						? "correct"
						: "wrong"
					: sound;
			const audio = new Audio(
				`${import.meta.env.BASE_URL}audio/feedback/${name}.wav`,
			);
			audio.volume =
				name === "tap" || name === "next"
					? 0.12
					: name === "complete"
						? 0.25
						: 0.35;
			currentAudio.current = audio;

			let finished = false;
			function finish() {
				if (finished || currentAudio.current !== audio) return;
				finished = true;
				clearTimeout(timer.current);
				timer.current = undefined;
				audio.pause();

				function followUp() {
					if (currentAudio.current !== audio) return;
					currentAudio.current = null;
					timer.current = undefined;
					onEnded?.();
				}

				if (onEnded && followUpDelay > 0) {
					timer.current = setTimeout(followUp, followUpDelay);
				} else {
					followUp();
				}
			}

			audio.addEventListener("ended", finish);
			audio.addEventListener("error", finish);
			if (onEnded) timer.current = setTimeout(finish, 1500);
			void audio.play().catch(finish);
		},
		[],
	);

	useEffect(() => stop, [stop]);

	return { play, stop };
}
