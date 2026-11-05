import "./RewardIcon.css";

const ICONS = {
	star: { src: "/openmoji/2B50.svg", alt: "zvezdice" },
	shell: { src: "/openmoji/seashell.svg", alt: "školjke" },
};

export function RewardIcon({ kind }: { kind: keyof typeof ICONS }) {
	return <img className="reward-icon" {...ICONS[kind]} />;
}
