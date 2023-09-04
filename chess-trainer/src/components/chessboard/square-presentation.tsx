import React from "react";
import BlackBishop from "../pieces/black-bishop";
import BlackKing from "../pieces/black-king";
import BlackKnight from "../pieces/black-knight";
import BlackPawn from "../pieces/black-pawn";
import BlackQueen from "../pieces/black-queen";
import BlackRook from "../pieces/black-rook";
import WhiteBishop from "../pieces/white-bishop";
import WhiteKing from "../pieces/white-king";
import WhiteKnight from "../pieces/white-knight";
import WhitePawn from "../pieces/white-pawn";
import WhiteQueen from "../pieces/white-queen";
import WhiteRook from "../pieces/white-rook";

interface SquarePresentationProps {
	square: string;
	piece: string;
	selected: boolean;
	onClick: () => void;
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
// ${PieceComponent.name.toUpperCase() === PieceComponent.name ? 'light' : 'dark'}
const SquarePresentation: React.FC<SquarePresentationProps> = ({ square, piece, selected, onClick }) => {
	const PieceComponent = pieceComponents[piece];

	const fileToNum = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

	const isLightSquare = (square: string) => {
		const file = fileToNum[square.charAt(0)];
		const rank = parseInt(square.charAt(1));
		return (file + rank) % 2 === 0;
	};

	const backgroundColor = isLightSquare(square) ? "bg-light-square" : "bg-dark-square";

	return (
		<div
			className={`flex justify-center items-center w-full h-full ${backgroundColor} square ${selected ? "selected" : ""}`}
			onClick={onClick}
		>
			{PieceComponent && <PieceComponent />}
		</div>
	);
};

export default React.memo(SquarePresentation);
