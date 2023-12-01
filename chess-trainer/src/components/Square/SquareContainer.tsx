import React, { useCallback, useEffect } from "react";
import { useGameState } from "../../store/game/contexts/GameContext";
import SquarePresentation from "./SquarePresentation";
import { CLEAR_SELECTED_SQUARES, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE } from "../../store/game/types/actionTypes";
import { getLastMoveSquares, isComputersTurn, isValidMove } from "../../utility/chessUtils";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import { useHandleLineSwitch } from "../../utility/hooks/useHandleLineSwitch";
import { useFetchNextMoveForComputer } from "../../utility/hooks/useFetchNextMoveForComputer";

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
			// dispatch({ type: SELECT_SQUARE, payload: { square: null } }); // Clear selection
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
