import { Question } from "./interfaces";

export const italianGameMainLine = {
  white: ["c3", "d3", "O-O", "Nbd2"],
  black: ["Nf6", "d6", "O-O"]
};

export const italianGameLines = {
  "Giuoco Pianissimo": [
    "e4", "e5", 
    "Nf3", "Nc6", 
    "Bc4", "Bc5", 
    "c3", "Nf6", 
    "d3", "d6", 
    "O-O", "O-O", 
    "Re1"
  ],
  "Two Knights": [
    "e4", "e5", 
    "Nf3", "Nc6", 
    "Bc4", "Bc5", 
    "c3", "Nf6", 
    "d3", "d6", 
    "O-O", "O-O", 
    "Bg5", "h6", 
    "Bh4", "g5", 
    "Bg3", "Kg7", 
    "Nbd2"
  ],
  "Hungarian": [
    "e4", "e5", 
    "Nf3", "Nc6", 
    "Bc4", "Be7", 
    "O-O", "d6", 
    "d4", "exd4", 
    "Nxd4", "Nf6", 
    "Nc3", "O-O", 
    "h3"
  ]
}

export const questions: Question[] = [
	{
		fen: "...", // After 3...Bc5
		correctMove: "c3",
		correctExplanation: "This move prepares d4 and gains central space.",
		incorrectExplanation: "c3 is the best move because it prepares d4 and gains central space.",
	},
	{
		fen: "...", // After 4...Nf6
		correctMove: "d3",
		correctExplanation: "Supporting the e4 pawn and preparing to develop the dark square bishop.",
		incorrectExplanation: "d3 is the best move as it supports the e4 pawn and prepares for dark square bishop development.",
	},
	{
		fen: "...", // After 5...d6
		correctMove: "O-O",
		correctExplanation: "Castling for king safety and rook activation.",
		incorrectExplanation: "Castling is essential here for king safety and to connect the rooks.",
	},
	{
		fen: "...", // After 6...O-O
		correctMove: "Nbd2",
		correctExplanation: "Developing the knight and supporting the e4 pawn.",
		incorrectExplanation: "Nbd2 is vital for knight development and supporting the e4 pawn.",
	},
	{
		fen: "...", // After further black moves.
		correctMove: "Re1",
		correctExplanation: "Placing the rook on an open file and supporting the e4 pawn.",
		incorrectExplanation: "Re1 is the best move as it places the rook on an open file and supports the e4 pawn.",
	},
	// ... Continue as needed.
];