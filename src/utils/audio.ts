// Isti ključ uporabita predvajalnik in generator posnetkov.
export function getGrammarAudioId(lessonId: string, questionId: string) {
	return `grammar/${lessonId}/${questionId}`;
}
