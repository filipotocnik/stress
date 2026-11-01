export function openmoji(code: string): string {
	return `${import.meta.env.BASE_URL}openmoji/${code}.svg`;
}
