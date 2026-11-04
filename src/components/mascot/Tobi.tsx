// Tobi – maskota (slog OpenMoji, mreža 72×72). Lastno delo ekipe, brez zunanje licence.
import type { ReactNode } from "react";

export type TobiMood = "happy" | "cheer" | "think" | "encourage" | "sad";
export type TobiOutfit =
	| "no-outfit"
	| "ninja"
	| "pirate"
	| "captain"
	| "astronaut"
	| "winter"
	| "christmas"
	| "summer"
	| "wizard";

const BODY = (
	<>
		<ellipse
			cx="27"
			cy="64"
			rx="6"
			ry="4"
			fill="#B1CC33"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<ellipse
			cx="45"
			cy="64"
			rx="6"
			ry="4"
			fill="#B1CC33"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<ellipse
			cx="36"
			cy="47"
			rx="21"
			ry="17"
			fill="#5C9E31"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M17.5 40 L21.5 42 M16 48 L21 48 M17.5 56 L21.5 54 M54.5 40 L50.5 42 M56 48 L51 48 M54.5 56 L50.5 54"
			fill="none"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<ellipse
			cx="36"
			cy="48"
			rx="13.5"
			ry="14"
			fill="#FCEA2B"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M23.6 42.5 Q36 45.5 48.4 42.5 M23.6 53.5 Q36 50.5 48.4 53.5 M36 44.3 L36 51.7"
			fill="none"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</>
);
const HEAD = (
	<>
		<circle
			cx="36"
			cy="23"
			r="14"
			fill="#B1CC33"
			stroke="#000"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<circle cx="29" cy="13.5" r="2" fill="#5C9E31" />
		<circle cx="44" cy="15" r="1.5" fill="#5C9E31" />
	</>
);

const ARMS: Record<TobiMood, ReactNode> = {
	happy: (
		<>
			<ellipse
				cx="15"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(25 15 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<ellipse
				cx="57"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(-25 57 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	cheer: (
		<>
			<ellipse
				cx="13.5"
				cy="33"
				rx="4.5"
				ry="6.5"
				transform="rotate(-35 13.5 33)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<ellipse
				cx="58.5"
				cy="33"
				rx="4.5"
				ry="6.5"
				transform="rotate(35 58.5 33)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	think: (
		<>
			<ellipse
				cx="15"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(25 15 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<ellipse
				cx="57"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(-25 57 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	encourage: (
		<>
			<ellipse
				cx="15"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(25 15 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<ellipse
				cx="58.5"
				cy="33"
				rx="4.5"
				ry="6.5"
				transform="rotate(35 58.5 33)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	sad: (
		<>
			<ellipse
				cx="15"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(25 15 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<ellipse
				cx="57"
				cy="48"
				rx="4.5"
				ry="6.5"
				transform="rotate(-25 57 48)"
				fill="#B1CC33"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
};

const FACE: Record<TobiMood, ReactNode> = {
	happy: (
		<>
			<circle cx="25.5" cy="27" r="2.2" fill="#E67A94" />
			<circle cx="46.5" cy="27" r="2.2" fill="#E67A94" />
			<circle cx="30" cy="22" r="2" fill="#000" />
			<circle cx="42" cy="22" r="2" fill="#000" />
			<path
				d="M30 28 Q36 33 42 28"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	cheer: (
		<>
			<circle cx="25.5" cy="27" r="2.2" fill="#E67A94" />
			<circle cx="46.5" cy="27" r="2.2" fill="#E67A94" />
			<path
				d="M27.5 23 Q30 19.5 32.5 23 M39.5 23 Q42 19.5 44.5 23"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M29 27 Q36 36 43 27 Z"
				fill="#EA5A47"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	think: (
		<>
			<circle cx="31" cy="21" r="2" fill="#000" />
			<circle cx="43" cy="21" r="2" fill="#000" />
			<path
				d="M39.5 17 L45 16.2"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M32 29.5 L39.5 28"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	encourage: (
		<>
			<circle cx="25.5" cy="27" r="2.2" fill="#E67A94" />
			<circle cx="46.5" cy="27" r="2.2" fill="#E67A94" />
			<circle cx="30" cy="22" r="2" fill="#000" />
			<path
				d="M39.5 22.5 Q42 20.5 44.5 22.5"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M30 28 Q36 33 42 28"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	sad: (
		<>
			<path
				d="M27 19.2 L32 17.3 M40 17.3 L45 19.2"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="30" cy="22.5" r="2" fill="#000" />
			<circle cx="42" cy="22.5" r="2" fill="#000" />
			<path
				d="M28.5 26 Q27 28.5 28.5 30 Q30 28.5 28.5 26 Z"
				fill="#92D3F5"
				stroke="#000"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
			<path
				d="M31.5 30.5 Q36 27 40.5 30.5"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
};

// Novo oblačilo = vnos v TobiOutfit + v OUTFIT_UNDER (pred obrazom) in/ali OUTFIT_OVER (čez vse).
const OUTFIT_UNDER: Record<TobiOutfit, ReactNode> = {
	"no-outfit": null,
	ninja: (
		<>
			<circle cx="44" cy="15" r="1.7" fill="#B1CC33" />
			<path
				d="M50.5 13.5 Q58 7.5 63.5 9.5 Q58.5 14 51.5 15.5 Z"
				fill="#3F3F3F"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M51 15 Q58.5 16.5 61 22.5 Q55 21 50.5 16.5 Z"
				fill="#3F3F3F"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				fillRule="evenodd"
				d="M36 7.5 A15.5 15.5 0 1 1 35.99 7.5 Z M23 19 Q23 14.5 28 14.5 L44 14.5 Q49 14.5 49 19 L49 25 Q49 34.5 36 34.5 Q23 34.5 23 25 Z"
				fill="#3F3F3F"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="51"
				cy="15"
				r="2"
				fill="#3F3F3F"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.4 50.5 Q36 54.5 56.6 50.5 L54.8 55.5 Q36 59.5 17.2 55.5 Z"
				fill="#3F3F3F"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<g transform="rotate(15 36 55.8)">
				<path
					d="M36 49.3 L38 53.8 L42.5 55.8 L38 57.8 L36 62.3 L34 57.8 L29.5 55.8 L34 53.8 Z"
					fill="#D0CFCE"
					stroke="#000"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				<circle cx="36" cy="55.8" r="1.3" fill="#3F3F3F" />
			</g>
		</>
	),
	pirate: (
		<>
			<path
				d="M25.5 33.5 Q36 41.5 46.5 33.5"
				fill="none"
				stroke="#000"
				strokeWidth="3.6"
				strokeLinecap="round"
			/>
			<path
				d="M25.5 33.5 Q36 41.5 46.5 33.5"
				fill="none"
				stroke="#F1B31C"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeDasharray="0.1 2.4"
			/>
			<path
				d="M36 37.3 L39 40.6 L36 44 L33 40.6 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
			<path
				d="M35 39.5 L36 38.6"
				fill="none"
				stroke="#fff"
				strokeWidth="0.9"
				strokeLinecap="round"
			/>
			<path
				d="M15.4 50.5 Q36 54.5 56.6 50.5 L54.8 55.5 Q36 59.5 17.2 55.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M19 55 Q15 59 11.5 64 L15 65 Q17.5 60.5 20.5 57 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M20 55.5 Q20.5 60.5 19.5 66 L23 66 Q23.5 60 22 55.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="19.8"
				cy="54.2"
				r="2.6"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="31.2"
				y="52.2"
				width="9.6"
				height="7.4"
				rx="1.8"
				fill="#F1B31C"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M36 53.6 L38.4 55.9 L36 58.2 L33.6 55.9 Z"
				fill="#92D3F5"
				stroke="#000"
				strokeWidth="1.2"
				strokeLinejoin="round"
			/>
		</>
	),
	captain: (
		<>
			<path
				d="M24.5 32.5 Q36 41.5 47.5 32.5 L49.5 37 Q36 48 22.5 37 Z"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M23.9 35.4 Q36 45.4 48.1 35.4"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="1.1"
				strokeLinecap="round"
			/>
			<path
				d="M34.6 43.5 L31.2 50.5 L35.2 49.5 Z"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M37.4 43.5 L40.8 50.5 L36.8 49.5 Z"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="36"
				cy="43"
				r="2.5"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	astronaut: (
		<>
			<path
				d="M15.4 50.5 Q36 54.5 56.6 50.5 L54.8 55.5 Q36 59.5 17.2 55.5 Z"
				fill="#D0CFCE"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="36"
				cy="55.3"
				r="4.2"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M36 52.6 L36.8 54.5 L38.8 54.6 L37.2 55.8 L37.8 57.8 L36 56.6 L34.2 57.8 L34.8 55.8 L33.2 54.6 L35.2 54.5 Z"
				fill="#F1B31C"
			/>
		</>
	),
	winter: (
		<>
			<path
				d="M45 37.5 Q52.5 36.5 59 31.5 L60.8 36 Q54 41 46 42.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M53.2 36.2 L54.8 40.2 M56.3 34.4 L57.9 38.4"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="1.3"
				strokeLinecap="round"
			/>
			<path
				d="M59.6 31.2 L61.4 30 M60.5 33.3 L62.6 32.6 M61.2 35.6 L63.4 35.4"
				fill="none"
				stroke="#000"
				strokeWidth="1.3"
				strokeLinecap="round"
			/>
			<path
				d="M24 32.5 Q36 42 48 32.5 L49.5 36.5 Q36 46.5 22.5 36.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M29.3 37.4 L28.6 41.2 M42.7 37.4 L43.4 41.2"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="1.3"
				strokeLinecap="round"
			/>
		</>
	),
	christmas: null,
	summer: (
		<>
			<path
				d="M13 51 Q36 56 59 51 A5 5 0 0 1 59 61 Q36 66 13 61 A5 5 0 0 1 13 51 Z"
				fill="#FFFFFF"
			/>
			<path
				d="M18 51.97 L13 51 A5 5 0 0 0 13 61 L18 61.97 Z M54 51.97 L59 51 A5 5 0 0 1 59 61 L54 61.97 Z M31.00 53.38 L32.67 53.45 L34.33 53.49 L36.00 53.50 L37.67 53.49 L39.33 53.45 L41.00 53.38 L41.00 63.38 L39.33 63.45 L37.67 63.49 L36.00 63.50 L34.33 63.49 L32.67 63.45 L31.00 63.38 Z"
				fill="#D22F27"
			/>
			<path
				d="M16 53.2 Q36 57.6 56 53.2"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="1.2"
				strokeLinecap="round"
				strokeOpacity="0.8"
			/>
			<path
				d="M13 51 Q36 56 59 51 A5 5 0 0 1 59 61 Q36 66 13 61 A5 5 0 0 1 13 51 Z"
				fill="none"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	wizard: (
		<>
			<path
				d="M46 63.5 L57.5 42.5"
				fill="none"
				stroke="#000"
				strokeWidth="4"
				strokeLinecap="round"
			/>
			<path
				d="M46 63.5 L57.5 42.5"
				fill="none"
				stroke="#A57939"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
			<path
				d="M15.4 50.5 Q36 54.5 56.6 50.5 L54.8 55.5 Q36 59.5 17.2 55.5 Z"
				fill="#8967AA"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M33 53 Q36 53.6 39 53 L39 57.6 Q36 58.2 33 57.6 Z"
				fill="#F1B31C"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M58.50 34.50 L60.09 38.32 L64.21 38.65 L61.07 41.33 L62.03 45.35 L58.50 43.20 L54.97 45.35 L55.93 41.33 L52.79 38.65 L56.91 38.32 Z"
				fill="#F1B31C"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M62.5 34.5 l0.6 1.3 1.3 0.6 -1.3 0.6 -0.6 1.3 -0.6 -1.3 -1.3 -0.6 1.3 -0.6 Z M53 35.5 l0.5 1 1 0.5 -1 0.5 -0.5 1 -0.5 -1 -1 -0.5 1 -0.5 Z"
				fill="#F1B31C"
			/>
		</>
	),
};

const OUTFIT_OVER: Record<TobiOutfit, ReactNode> = {
	"no-outfit": null,
	ninja: null,
	pirate: (
		<>
			<g transform="translate(0 -1.5)">
				<path
					d="M43 7.5 Q49.5 2.5 56 4 Q51.5 8.5 45 9.5 Z"
					fill="#D22F27"
					stroke="#000"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M24.5 11.5 Q25 3 36 3.2 Q47 3 47.5 11.5 Z"
					fill="#3F3F3F"
					stroke="#000"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M18.5 11.5 Q36 5.5 53.5 11.5 Q36 17 18.5 11.5 Z"
					fill="#3F3F3F"
					stroke="#000"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M21.5 11.5 Q36 7.5 50.5 11.5"
					fill="none"
					stroke="#F1B31C"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<circle
					cx="36"
					cy="7"
					r="2.4"
					fill="#fff"
					stroke="#000"
					strokeWidth="1.2"
				/>
				<circle cx="35.1" cy="6.8" r=".55" fill="#000" />
				<circle cx="36.9" cy="6.8" r=".55" fill="#000" />
			</g>
		</>
	),
	captain: (
		<>
			<path
				d="M22.5 10.5 L18.5 5 Q36 -1 53.5 5 L49.5 10.5 Z"
				fill="#FFFFFF"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M23 9.5 L49 9.5 L49 12.8 L23 12.8 Z"
				fill="#1E50A0"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M24 12.8 Q36 17.2 48 12.8 Z"
				fill="#000"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M36 3.6 L36 8.2 M34.4 4.8 L37.6 4.8 M33.6 6.6 Q36 9.2 38.4 6.6"
				fill="none"
				stroke="#F1B31C"
				strokeWidth="1.3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	astronaut: (
		<>
			<path
				d="M21 37 Q36 45.5 51 37 L51 40.5 Q36 49 21 40.5 Z"
				fill="#D0CFCE"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="36"
				cy="22.5"
				r="17.5"
				fill="#92D3F5"
				fillOpacity="0.25"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M23.5 15 Q26.5 9 32.5 7.3"
				fill="none"
				stroke="#FFFFFF"
				strokeWidth="2.2"
				strokeLinecap="round"
			/>
			<circle cx="22.6" cy="18.6" r="1" fill="#FFFFFF" />
		</>
	),
	winter: (
		<>
			<path
				d="M23 12.5 Q22 3 36 3.2 Q50 3 49 12.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M21.5 11.6 Q36 9.6 50.5 11.6 L50.8 15 Q36 13 21.2 15 Z"
				fill="#FFFFFF"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M26 11.4 L26 13.8 M31 10.9 L31 13.3 M36 10.7 L36 13.1 M41 10.9 L41 13.3 M46 11.4 L46 13.8"
				fill="none"
				stroke="#000"
				strokeWidth="1"
				strokeLinecap="round"
			/>
			<circle
				cx="36"
				cy="4"
				r="2.6"
				fill="#FFFFFF"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	christmas: (
		<>
			<path
				d="M23 12 Q23.5 2.5 36 2.2 Q48 2 56 9.5 Q50.5 7.5 49 12 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M21.5 11 Q36 8.4 50.5 11 Q52.2 13 50.8 15.2 Q36 12.8 21.2 15.2 Q19.8 13 21.5 11 Z"
				fill="#FFFFFF"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="56.5"
				cy="10.5"
				r="3"
				fill="#FFFFFF"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	summer: (
		<>
			<path
				d="M25.5 11.5 Q25 2.5 36 2.5 Q47 2.5 46.5 11.5 Z"
				fill="#F4D58D"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M25.6 7.6 Q36 6.3 46.4 7.6 L46.5 11 Q36 9.8 25.5 11 Z"
				fill="#D22F27"
			/>
			<path
				d="M13.5 12.5 Q36 6.5 58.5 12.5 Q36 17.2 13.5 12.5 Z"
				fill="#F4D58D"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M19.5 12.3 Q36 9 52.5 12.3"
				fill="none"
				stroke="#A57939"
				strokeWidth="1"
				strokeLinecap="round"
				strokeDasharray="1.5 1.5"
			/>
		</>
	),
	wizard: (
		<>
			<path
				d="M25.5 12 Q30 7.5 37 4.3 Q45 1.2 55.5 3 Q47.5 4.8 45 8.5 L46.5 12 Z"
				fill="#B399C8"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 12.5 Q36 7.2 56 12.5 Q36 17.2 16 12.5 Z"
				fill="#8967AA"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M34.00 6.20 L34.56 7.54 L36.00 7.65 L34.90 8.59 L35.23 10.00 L34.00 9.25 L32.77 10.00 L33.10 8.59 L32.00 7.65 L33.44 7.54 Z M41.50 5.00 L41.92 6.02 L43.02 6.11 L42.18 6.82 L42.44 7.89 L41.50 7.32 L40.56 7.89 L40.82 6.82 L39.98 6.11 L41.08 6.02 Z M49.50 3.20 L49.79 3.90 L50.55 3.96 L49.97 4.45 L50.15 5.19 L49.50 4.79 L48.85 5.19 L49.03 4.45 L48.45 3.96 L49.21 3.90 Z"
				fill="#F1B31C"
			/>
		</>
	),
};

type Props = {
	mood?: TobiMood;
	outfit?: TobiOutfit;
	size?: number;
	className?: string;
};

export function Tobi({
	mood = "happy",
	outfit = "no-outfit",
	size = 96,
	className,
}: Props) {
	return (
		<svg
			viewBox="0 0 72 72"
			width={size}
			height={size}
			className={className}
			role="img"
			aria-label="Tobi"
		>
			{ARMS[mood]}
			{BODY}
			{HEAD}
			{OUTFIT_UNDER[outfit]}
			{FACE[mood]}
			{OUTFIT_OVER[outfit]}
		</svg>
	);
}

export default Tobi;
