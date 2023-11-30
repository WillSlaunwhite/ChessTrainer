import React, { useEffect } from "react";
import { useGameState } from "../../store/game/contexts/GameContext";
import SquarePresentation from "./SquarePresentation";
import { SELECT_SQUARE } from "../../store/game/types/actionTypes";
import { isValidMove } from "../../utility/chessUtils";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string, fen: string) => void;
	fen: string;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove, fen }) => {
	const [gameState, dispatch] = useGameState();
	const selectedSquares = gameState.global.selectedSquares;
	var isSelected = selectedSquares.includes(square);

	const handleClick = () => {
		// If a square is already selected and the current click is on a different square
		if (selectedSquares.length > 0 && selectedSquares[selectedSquares.length - 1] !== square) {
			if (isValidMove(fen, selectedSquares[selectedSquares.length - 1], square)) {
				// Make the move
				dispatch({ type: SELECT_SQUARE, payload: { square: square } });
				onMove(selectedSquares[selectedSquares.length - 1], square, fen);
			} else if (piece){
				// Optionally handle invalid move (show error, etc.)
				dispatch({ type: SELECT_SQUARE, payload: { square: square } });
			}
			// dispatch({ type: SELECT_SQUARE, payload: { square: null } }); // Clear selection
		} else {
			// Select the square or deselect if it's already selected
			dispatch({ type: SELECT_SQUARE, payload: { square: square } });
		}
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} />;
};

export default React.memo(SquareContainer);
