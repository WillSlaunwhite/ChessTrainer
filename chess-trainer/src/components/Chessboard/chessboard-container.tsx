import React from "react";
import { useGameState } from "../../contexts/game/game-context";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleUserMoveUpdate }) => {
	const [gameState] = useGameState();
	const handleMove = useUserMoveLogic(handleUserMoveUpdate);
	const lineIndex = gameState.currentLineIndex;
	const currentFens = gameState.currentFens;

	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
