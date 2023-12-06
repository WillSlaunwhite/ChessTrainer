import React from "react";
import { useGameState } from "../../store/game/contexts/GameContext";
import { SELECT_SQUARE, SET_HIGHLIGHT_SQUARES } from "../../store/game/types/actionTypes";
import { getPossibleMovesForSquare, isValidMove } from "../../utility/chessUtils";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import SquarePresentation from "./SquarePresentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	fen: string;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, fen }) => {
	const [gameState, dispatch] = useGameState();
	const selectedSquare = gameState.global.selectedSquare;
	const highlightedSquares = gameState.global.highlightedSquares;
	var isSelected = (square === selectedSquare || (highlightedSquares && highlightedSquares.includes(square)));
	const onMove = useUserMoveLogic();
	const isValid = isValidMove(fen, selectedSquare, square);

	const handleClick = () => {
		// there's another square selected and it isn't this one
		if (piece && !selectedSquare) {
			dispatch({ type: SELECT_SQUARE, payload: { square: square } });
			dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: getPossibleMovesForSquare(fen, square) } });
		} else if (selectedSquare && isValid) {
			onMove.handleMove(selectedSquare, square, fen);
		} else if (selectedSquare === square && highlightedSquares.length > 2) {
			dispatch({ type: SELECT_SQUARE, payload: { square: square } });
			dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: getPossibleMovesForSquare(fen, square) } });
		} else {
			if (piece || selectedSquare) {
				dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: getPossibleMovesForSquare(fen, selectedSquare) } });
			}
			dispatch({ type: SELECT_SQUARE, payload: { square: "" } });
		}
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} />;
};

export default React.memo(SquareContainer);
