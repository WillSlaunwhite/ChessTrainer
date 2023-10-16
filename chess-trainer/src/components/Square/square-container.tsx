import React from "react";
import { useGameState } from "../../contexts/game/game-context";
import { SELECT_SQUARE } from "../../contexts/game/gameActions";
import SquarePresentation from "./square-presentation";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string) => void;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove }) => {
	const [gameState, dispatch] = useGameState();

	const selectedSquare = gameState.selectedSquare;
	const isSelected = square === selectedSquare;

	const handleClick = () => {
		if (square === selectedSquare) {
			dispatch({ type: SELECT_SQUARE, payload: { square: null } })
		} else {
			if (selectedSquare) {
				onMove(selectedSquare, square);
				return;
			}
			dispatch({ type: SELECT_SQUARE, payload: { square: square } })
		}
	};

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} selectedSquare={selectedSquare} />;
};

export default React.memo(SquareContainer);
