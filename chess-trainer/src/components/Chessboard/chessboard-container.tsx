import React from "react";
import { useGameState } from "../../contexts/game/game-context";
import ChessboardPresentation from "./chessboard-presentation";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";

interface ChessboardContainerProps {
	// handleMove: (source: string, destination: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({  }) => {
	const [gameState, _dispatch] = useGameState();
	
	
	const lineIndex = gameState.currentLineIndex;
	const currentFens = gameState.currentFens;

	const handleUserMove = useUserMoveLogic();

	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleUserMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
