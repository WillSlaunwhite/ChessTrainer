import React from "react";
import SquareContainer from "../Square/SquareContainer";
import { fenToArray } from "../../utility/chessUtils";

interface ChessboardPresentationProps {
	fen: string;
	highlightedSquares: string[];
	selectedSquare: string;
	toSquare: string;
}

const ChessboardPresentation: React.FC<ChessboardPresentationProps> = ({ fen, highlightedSquares, selectedSquare, toSquare }) => {
	const cols = "abcdefgh";
	const board = fen.split(" ")[0];

	const boardArray = fenToArray(board);

	return (
		<div className="chessboard grid w-344px h-344px shadow hover:shadow-lg">
			{boardArray.map((row, rowIndex) => {
				return row.map((piece, colIndex) => {
					const square = `${cols[colIndex]}${8 - rowIndex}`;
					return <SquareContainer key={square} square={square} piece={piece || ''} highlightedSquares={highlightedSquares} selectedSquare={selectedSquare} isTo={square === toSquare} />;
				});
			})}
		</div>
	);
};

export default React.memo(ChessboardPresentation);
