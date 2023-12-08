import React from "react";
import { useHandleSquareClickLogic } from "../../utility/hooks/useHandleSquareClickLogic";
import SquarePresentation from "./SquarePresentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	selectedSquare: string;
	highlightedSquares: string[];
	isTo: boolean;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, selectedSquare, highlightedSquares, isTo }) => {
	const isSelected = (square === selectedSquare || (highlightedSquares && highlightedSquares.includes(square)));
	const isFadedOut = isSelected && (square !== selectedSquare && !isTo);
	const handleSquareClick = useHandleSquareClickLogic();

	const handleClick = () => {
		handleSquareClick.handleSquareClick(piece, square);
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} isFadedOut={isFadedOut} />;
};

export default React.memo(SquareContainer);
