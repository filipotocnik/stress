import { useCallback } from "react";
import type { Word } from "../models/word";
import { useRecordedAudio } from "./useRecordedAudio";

export function useWordAudio() {
	const { play: playRecording, stop, playingId, error } = useRecordedAudio();
	const play = useCallback(
		(word: Word) => playRecording(word.id),
		[playRecording],
	);

	return { play, stop, playingWordId: playingId, error };
}
