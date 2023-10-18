import React, { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import ChessboardPresentation from "./chessboard-presentation";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";

interface ChessboardContainerProps { }

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ }) => {
	const [gameState, _dispatch] = useGameState();


	const lineIndex = gameState.currentLineIndex;
	const currentFens = gameState.currentFens;
	const readyToMove = gameState.isComputerReadyToMove;
	const nextMove = gameState.nextMoves[lineIndex];
	const isComputerTurn = gameState.isComputerTurn;

	// hooks
	const handleComputerMove = useComputerMoveLogic();
	const handleUserMove = useUserMoveLogic();


	useEffect(() => {
		if (readyToMove === true && nextMove !== "" && isComputerTurn === true) {
			console.log("READY TO MOVE: ", readyToMove, "\nNEXT MOVE: ", nextMove, "\nIS COMPUTER TURN: ", isComputerTurn);
			
			handleComputerMove.makeComputerMove(nextMove);
		}
	}, [nextMove, readyToMove, isComputerTurn]);


	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleUserMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
