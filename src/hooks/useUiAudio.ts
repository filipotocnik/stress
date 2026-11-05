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
					":disabled, [aria-disabled='true'], [aria-current='page'], [role='tab'][aria-selected='true']",
				)
			)
				return;
			play("tap");
		}

		function handleChange(event: Event) {
			const input = event.target;
			if (
				input instanceof HTMLInputElement &&
				input.matches(
					"input[type=radio][data-ui-sound]:checked:not(:disabled)",
				)
			)
				play("tap");
		}

		document.addEventListener("click", handleClick, true);
		document.addEventListener("change", handleChange, true);
		return () => {
			document.removeEventListener("click", handleClick, true);
			document.removeEventListener("change", handleChange, true);
		};
	}, [play]);
}
