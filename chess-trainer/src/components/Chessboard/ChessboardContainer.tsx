import React from "react";
import ChessboardPresentation from "./ChessboardPresentation";

interface ChessboardContainerProps {
	fen: string;
	highlightedSquares: string[];
	selectedSquare: string;
	toSquare: string;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ fen, highlightedSquares, selectedSquare, toSquare }) => {
	
	return <ChessboardPresentation fen={fen} highlightedSquares={highlightedSquares} selectedSquare={selectedSquare} toSquare={toSquare} />;
};


export default React.memo(ChessboardContainer);
