export interface OpeningLine {
	lastComputerMove: string;
	whiteMoves: string[];
	blackMoves: string[];
	correctExplanations: string[];
	incorrectExplanations: string[];
	wrongAnswers: string[];
}

export const italianGameMainLine: OpeningLine = {
	lastComputerMove: "Bc5",
	whiteMoves: ["c3", "d3", "O-O", "Nbd2", "Re1", "h3", "Bb3"],
	blackMoves: ["Nf6", "d6", "O-O", "a6", "Bg4", "Bh5", "Re8"],
	correctExplanations: [
		"This move prepares d4 and gains central space.",
		"Supporting the e4 pawn and preparing to develop the dark square bishop.",
		"Castling for king safety and rook activation.",
		"Developing the knight and supporting the e4 pawn.",
		"Placing the rook on an open file and supporting the e4 pawn.",
		"Making a luft for the king and preventing any pin on the knight.",
		"Retreating the bishop to a safer square, away from any threats.",
	],
	incorrectExplanations: [
		"c3 is the best move because it prepares d4 and gains central space.",
		"d3 is the best move as it supports the e4 pawn and prepares for dark square bishop development.",
		"Castling is essential here for king safety and to connect the rooks.",
		"Nbd2 is vital for knight development and supporting the e4 pawn.",
		"Re1 is the best move as it places the rook on an open file and supports the e4 pawn.",
		"h3 gives the king some breathing space and avoids any pin on the knight.",
		"Bb3 is crucial as it takes the bishop to a safer square.",
	],
	wrongAnswers: []
};

export const italianGameTwoKnights: OpeningLine = {
	lastComputerMove: "Nf6",
	whiteMoves: ["d3", "O-O", "Bg5", "Bh4", "Bg3", "Nbd2", "Re1"],
	blackMoves: ["d6", "O-O", "h6", "g5", "Kg7", "Nh5", "f5"],
	correctExplanations: [
		"Supporting the e4 pawn and preparing to develop the dark square bishop.",
		"Castling for king safety and rook activation.",
		"Pinning the knight and putting pressure on the f6 knight.",
		"Retreating the bishop while maintaining the pressure.",
		"Repositioning the bishop to a safer square.",
		"Developing the knight and supporting the e4 pawn.",
		"Placing the rook on an open file and supporting the e4 pawn.",
	],
	incorrectExplanations: [
		"d3 is the best move as it supports the e4 pawn and prepares for dark square bishop development.",
		"Castling is essential here for king safety and to connect the rooks.",
		"Bg5 creates a pin and pressures Black's knight.",
		"Bh4 maintains the pressure on the knight.",
		"Bg3 takes the bishop to a safer square.",
		"Nbd2 is vital for knight development and supporting the e4 pawn.",
		"Re1 is the best move as it places the rook on an open file and supports the e4 pawn.",
	],
	wrongAnswers: []
};

export const italianGameHungarian: OpeningLine = {
	lastComputerMove: "Be7",
	whiteMoves: ["O-O", "d4", "Nxd4", "Nc3", "h3", "Bxe6", "Be3"],
	blackMoves: ["d6", "exd4", "Nf6", "O-O", "Be6", "fxe6", "e5"],
	correctExplanations: [
		"Castling for king safety and rook activation.",
		"White seizes the center and opens up lines for the pieces.",
		"Recapturing with the knight to maintain central control.",
		"Developing the knight and controlling the center.",
		"Making a luft for the king and preventing any pin on the knight.",
		"Capturing the bishop to double Black's pawns.",
		"Developing the bishop and controlling the central squares.",
	],
	incorrectExplanations: [
		"Castling connects the rooks and keeps the king safe.",
		"d4 looks to open up the position and prepare for future development.",
		"Nxd4 is preferred to keep a solid pawn structure.",
		"Nc3 develops a piece and eyes the central squares.",
		"h3 gives the king some breathing space and avoids any pin on the knight.",
		"Bxe6 disrupts Black's pawn structure.",
		"Be3 supports the center and prepares for future moves.",
	],
	wrongAnswers: []
};