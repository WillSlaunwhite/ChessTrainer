import React from "react";
import ChessboardPresentation from "./ChessboardPresentation";

interface ChessboardContainerProps {
	fen: string;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ fen }) => {
	return <ChessboardPresentation fen={fen} />;
};


export default React.memo(ChessboardContainer);
