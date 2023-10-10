import React from "react";
import BlackBishop from "../MainMenu/Pieces/black/black-bishop";
import BlackKing from "../MainMenu/Pieces/black/black-king";
import BlackKnight from "../MainMenu/Pieces/black/black-knight";
import BlackPawn from "../MainMenu/Pieces/black/black-pawn";
import BlackQueen from "../MainMenu/Pieces/black/black-queen";
import BlackRook from "../MainMenu/Pieces/black/black-rook";
import WhiteBishop from "../MainMenu/Pieces/white/white-bishop";
import WhiteKing from "../MainMenu/Pieces/white/white-king";
import WhiteKnight from "../MainMenu/Pieces/white/white-knight";
import WhitePawn from "../MainMenu/Pieces/white/white-pawn";
import WhiteQueen from "../MainMenu/Pieces/white/white-queen";
import WhiteRook from "../MainMenu/Pieces/white/white-rook";


interface SquarePresentationProps {
	square: string;
	piece: string;
	selected: boolean;
	onClick: () => void;
	selectedSquare: string | null;
}

const pieceComponents: Record<string, React.FC> = {
	P: WhitePawn,
	R: WhiteRook,
	N: WhiteKnight,
	B: WhiteBishop,
	Q: WhiteQueen,
	K: WhiteKing,
	p: BlackPawn,
	r: BlackRook,
	n: BlackKnight,
	b: BlackBishop,
	q: BlackQueen,
	k: BlackKing,
};

const SquarePresentation: React.FC<SquarePresentationProps> = ({ square, piece, selected, onClick, selectedSquare }) => {
	const PieceComponent = pieceComponents[piece];

	const fileToNum = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

	const isLightSquare = (square: string) => {
		const file = fileToNum[square.charAt(0) as keyof typeof fileToNum];
		const rank = parseInt(square.charAt(1));
		return (file + rank) % 2 === 0;
	};

	const backgroundColor = isLightSquare(square) ? "bg-light-square" : "bg-dark-square";

	return (
		<div
			className={`flex justify-center items-center w-full h-full ${backgroundColor} square ${selected ? "highlighted" : ""}`}
			onClick={onClick}
		>
			{PieceComponent && <PieceComponent />}
		</div>
	);
};

export default React.memo(SquarePresentation);