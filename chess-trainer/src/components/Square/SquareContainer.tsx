import React from "react";
import { useGameState } from "../../store/game/contexts/GameContext";
import { SELECT_SQUARE } from "../../store/game/types/actionTypes";
import { isValidMove } from "../../utility/chessUtils";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import SquarePresentation from "./SquarePresentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	fen: string;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, fen }) => {
	const [gameState, dispatch] = useGameState();
	const selectedSquares = gameState.global.selectedSquares;
	var isSelected = selectedSquares.includes(square);
	const onMove = useUserMoveLogic();
	const isValid = isValidMove(fen, selectedSquares[selectedSquares.length - 1], square);

	const handleClick = () => {
		// If a square is already selected and the current click is on a different square
		if (selectedSquares.length > 0 && selectedSquares[selectedSquares.length - 1] !== square) {
			if (isValid) {
				// Make the move
				dispatch({ type: SELECT_SQUARE, payload: { square: square } });
				onMove.handleMove(selectedSquares[selectedSquares.length - 1], square, fen);
			} else if (!isValid && selectedSquares.length > 2) {
				// Optionally handle invalid move (show error, etc.)
				dispatch({ type: SELECT_SQUARE, payload: { square: selectedSquares.slice(-1)[0] } });
			}
			else if (piece) {
				// Select the square or deselect if it's already selected
				dispatch({ type: SELECT_SQUARE, payload: { square: square } });
			}

		} else {
			// Select the square or deselect if it's already selected
			dispatch({ type: SELECT_SQUARE, payload: { square: square } });
		}
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} />;
};

export default React.memo(SquareContainer);
