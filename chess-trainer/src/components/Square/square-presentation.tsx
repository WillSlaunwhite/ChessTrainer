import React from "react";
import { useChessboard } from "../../../contexts/chess-context";

import BlackBishop from "../pieces/black/black-bishop";
import WhiteBishop from "../pieces/white/white-bishop";
import BlackKing from "../pieces/black/black-king";
import BlackKnight from "../pieces/black/black-knight";
import BlackPawn from "../pieces/black/black-pawn";
import BlackQueen from "../pieces/black/black-queen";
import BlackRook from "../pieces/black/black-rook";
import WhiteKing from "../pieces/white/white-king";
import WhiteKnight from "../pieces/white/white-knight";
import WhitePawn from "../pieces/white/white-pawn";
import WhiteQueen from "../pieces/white/white-queen";
import WhiteRook from "../pieces/white/white-rook";

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

const SquarePresentation: React.FC<SquarePresentationProps> = ({ square, piece, selected, onClick }) => {
	const PieceComponent = pieceComponents[piece];
	const { selectedSquare } = useChessboard();

	const fileToNum = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 };

	const isLightSquare = (square: string) => {
		const file = fileToNum[square.charAt(0) as keyof typeof fileToNum];
		const rank = parseInt(square.charAt(1));
		return (file + rank) % 2 === 0;
	};

	const backgroundColor = isLightSquare(square) ? "bg-light-square" : "bg-dark-square";

	return (
		<div
			className={`flex justify-center items-center w-full h-full ${backgroundColor} square ${selected ? "selected" : ""} ${
				square === selectedSquare ? "highlighted" : ""
			}`}
			onClick={onClick}
		>
			{PieceComponent && <PieceComponent />}
		</div>
	);
};

const SquarePresentationMemo = React.memo(SquarePresentation);
export default SquarePresentationMemo;
