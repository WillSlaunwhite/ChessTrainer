import React from "react";
import SquareContainer from "../Square/SquareContainer";

interface ChessboardPresentationProps {
	fen: string;
}

const ChessboardPresentation: React.FC<ChessboardPresentationProps> = ({ fen }) => {
	const cols = "abcdefgh";
	const board = fen.split(" ")[0];

	const fenToArray = (fen: string): (string | null)[][] => {
		const rows = fen.split("/");
		return rows.map((row) => {
			let squares: (string | null)[] = [];
			for (const char of row) {
				if (isNaN(parseInt(char))) {
					// If it's a piece
					squares.push(char);
				} else {
					// If it's a number, add that many null values
					squares = squares.concat(Array(parseInt(char)).fill(null));
				}
			}
			return squares;
		});
	};

	const boardArray = fenToArray(board);

	return (
		<div className="chessboard grid w-344px h-344px shadow hover:shadow-lg">
			{boardArray.map((row, rowIndex) => {
				return row.map((piece, colIndex) => {
					const square = `${cols[colIndex]}${8 - rowIndex}`;
					return <SquareContainer key={square} square={square} piece={piece || ''} fen={fen} />;
				});
			})}
		</div>
	);
};

export default React.memo(ChessboardPresentation);
