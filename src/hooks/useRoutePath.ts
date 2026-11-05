import { useEffect, useRef, useState } from "react";

// Črtkana pot: izmerimo, kje so otoki, in jih povežemo s krivuljami.
// Pot narišemo znova, ko se spremeni velikost zemljevida (npr. širina okna).
export function useRoutePath() {
	const mapRef = useRef<HTMLElement>(null);
	const [path, setPath] = useState("");

	useEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		function draw() {
			if (!map) return;
			const mapBox = map.getBoundingClientRect();
			const points = [...map.querySelectorAll(".stop__island")].map(
				(island) => {
					const box = island.getBoundingClientRect();
					return {
						x: box.left - mapBox.left + box.width / 2,
						y: box.top - mapBox.top + box.height / 2,
					};
				},
			);

			if (points.length === 0) {
				setPath("");
				return;
			}

			// Med dvema otokoma narišemo mehko krivuljo v obliki črke S
			let d = `M ${points[0].x} ${points[0].y}`;
			for (let i = 1; i < points.length; i++) {
				const from = points[i - 1];
				const to = points[i];
				const middleY = (from.y + to.y) / 2;
				d += ` C ${from.x} ${middleY} ${to.x} ${middleY} ${to.x} ${to.y}`;
			}
			setPath(d);
		}

		const observer = new ResizeObserver(draw);
		observer.observe(map);
		return () => observer.disconnect();
	}, []);

	return { mapRef, path };
}
