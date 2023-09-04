import React from "react";
import SquareContainer from "./square-container";

interface ChessboardPresentationProps {
	fen: string;
	onMove: (source: string, destination: string) => void;
}

const ChessboardPresentation: React.FC<ChessboardPresentationProps> = ({ fen, onMove }) => {
	const rows = "87654321";
	const cols = "abcdefgh";
	const board = fen.split(" ")[0];

	return (
		<div className="chessboard grid w-96 h-96">
			{rows.split("").map((row) => {
				return cols.split("").map((col) => {
					const square = col + row;
					const piece = board.charAt(rows.indexOf(row) * 8 + cols.indexOf(col));
					return <SquareContainer key={square} square={square} piece={piece} onMove={onMove} />;
				});
			})}
		</div>
	);
};

export default ChessboardPresentation;
