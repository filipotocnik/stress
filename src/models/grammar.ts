// table row, with actual grammar rules/examples
export interface GrammarHintRow {
    label: string;
    pattern: string;
    example: string;
}

// explanation of grammar before starting the exercise
export interface GrammarHint {
    id: string;
    titleSl: string;
    explanationSl: string;
    rows?: GrammarHintRow[]; // table of examples can be omitted
}

// the actual exercise
export interface GrammarPractice {
    id: string;
    sentence: string;   // with exactly one ___ marker
    options: string[];  // words to choose from
    correctAnswer: string;  // must match exactly one of the words
}