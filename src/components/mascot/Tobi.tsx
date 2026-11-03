// Tobi – maskota (slog OpenMoji, mreža 72×72).
import type { ReactNode } from "react";

export type TobiMood = "happy" | "cheer" | "think" | "encourage" | "sad";
export type TobiOutfit = "none" | "ninja" | "pirate";

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

// Novo oblačilo = nov vnos tukaj + v TobiOutfit. Riši nad y≈14.5, da ne prekriješ obraza.
const OUTFIT: Record<TobiOutfit, ReactNode> = {
	none: null,
	ninja: (
		<>
			<path
				d="M46 13 Q54 7 60 9.5 Q55 14 47 15 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M46.5 14.5 Q55 15.5 58 21.5 Q51.5 20 46 15.5 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M24.5 15 A14 14 0 0 1 30.8 10 Q36 9 41.2 10 A14 14 0 0 1 47.5 15 Q36 16.6 24.5 15 Z"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle
				cx="47"
				cy="14.3"
				r="2"
				fill="#D22F27"
				stroke="#000"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</>
	),
	pirate: (
		<>
			<g transform="translate(0 -1.5)">
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
};

type Props = {
	mood?: TobiMood;
	outfit?: TobiOutfit;
	size?: number;
	className?: string;
};

export function Tobi({
	mood = "happy",
	outfit = "none",
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
			{FACE[mood]}
			{OUTFIT[outfit]}
		</svg>
	);
}

export default Tobi;
