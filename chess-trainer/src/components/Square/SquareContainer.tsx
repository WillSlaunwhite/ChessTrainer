import React from "react";
import { useGameState } from "../../store/game/contexts/GameContext";
import SquarePresentation from "./SquarePresentation";
import { SELECT_SQUARE } from "../../store/game/actions/actionTypes";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string, fen: string) => void;
	fen: string;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove, fen }) => {
	const [gameState, dispatch] = useGameState();
	const selectedSquare = gameState.global.selectedSquare;
	const isSelected = square === selectedSquare;

	const handleClick = () => {
		if (square === selectedSquare) {
			dispatch({ type: SELECT_SQUARE, payload: { square: null } })
		} else {
			if (selectedSquare) {
				onMove(selectedSquare, square, fen);
				return;
			}
			dispatch({ type: SELECT_SQUARE, payload: { square: square } })
		}
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} selectedSquare={selectedSquare} />;
};

export default React.memo(SquareContainer);
