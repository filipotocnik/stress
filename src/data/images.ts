const baseUrl = import.meta.env?.BASE_URL ?? "/";

export function openmoji(code: string): string {
	return `${baseUrl}openmoji/${code}.svg`;
}
