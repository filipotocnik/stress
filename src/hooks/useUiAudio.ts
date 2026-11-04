import { useEffect } from "react";
import { useFeedbackAudio } from "./useFeedbackAudio";

export function useUiAudio() {
	const { play } = useFeedbackAudio();

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			)
				return;
			if (!(event.target instanceof Element)) return;
			const action = event.target.closest(
				"button[data-ui-sound], a[data-ui-sound]",
			);
			if (
				!action ||
				action.matches(
					":disabled, [aria-disabled='true'], [aria-current='page']",
				)
			)
				return;
			play("tap");
		}

		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick, true);
	}, [play]);
}
