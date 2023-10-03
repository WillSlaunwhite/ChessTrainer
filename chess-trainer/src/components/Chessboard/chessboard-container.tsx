import React from "react";
import { useGameState } from "../../contexts/game/game-context";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import ChessboardPresentation from "./chessboard-presentation";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";

interface ChessboardContainerProps {
	// handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void;
	currentLineIndex: number;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ currentLineIndex }) => {
	const [gameState, dispatch] = useGameState();
	const handleUserMoveUpdate = useHandleMoveUpdate(gameState, dispatch);
	const  handleMove = useUserMoveLogic(handleUserMoveUpdate);

	return <ChessboardPresentation fen={gameState.currentFens[currentLineIndex]} onMove={handleMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
