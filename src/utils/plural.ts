export function plural(
	n: number,
	forms: [string, string, string, string],
): string {
	const lastTwo = n % 100;
	let form = forms[3];
	if (lastTwo === 1) form = forms[0];
	else if (lastTwo === 2) form = forms[1];
	else if (lastTwo === 3 || lastTwo === 4) form = forms[2];
	return `${n} ${form}`;
}
