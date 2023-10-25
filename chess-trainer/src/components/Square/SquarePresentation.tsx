import React from "react";
import BlackBishop from "../Pieces/black/BlackBishop";
import BlackKing from "../Pieces/black/BlackKing";
import BlackKnight from "../Pieces/black/BlackKnight";
import BlackPawn from "../Pieces/black/BlackPawn";
import BlackQueen from "../Pieces/black/BlackQueen";
import BlackRook from "../Pieces/black/BlackRook";
import WhiteBishop from "../Pieces/white/WhiteBishop";
import WhiteKing from "../Pieces/white/WhiteKing";
import WhiteKnight from "../Pieces/white/WhiteKnight";
import WhitePawn from "../Pieces/white/WhitePawn";
import WhiteQueen from "../Pieces/white/WhiteQueen";
import WhiteRook from "../Pieces/white/WhiteRook";


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

const SquarePresentation: React.FC<SquarePresentationProps> = ({ square, piece, selected, onClick }) => {
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