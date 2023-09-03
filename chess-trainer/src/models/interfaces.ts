export interface Move {
	color: "w" | "b";
	from: string;
	to: string;
	flags: string;
	piece: string;
	san: string;
	captured?: string;
	promotion?: string;
}

export interface Question {
	fen: string;
	correctMove: string;
	correctExplanation: string;
	incorrectExplanation: string;
}
