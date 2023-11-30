import React, { useEffect } from "react";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import ChessboardPresentation from "./ChessboardPresentation";

interface ChessboardContainerProps {
	fen: string;
	handleMove: (source: string, destination: string, fen: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ fen, handleMove }) => {
	// * hooks


	// useEffect(() => {
	// 	if (readyToMove === true && nextMove !== "" && isComputerTurn === true) {
	// 		handleComputerMove.makeComputerMove(nextMove, fen);
	// 	}
	// }, [nextMove, readyToMove, isComputerTurn]);


	// useEffect(() => {
	// 	(async () => {
	// 		const previousLineMoveHistory = gameState.moveHistories[currentLineIndex];

	// 		console.log("SECOND USE EFFECT: ", gameState);
	// 		console.log("CURRENT LINE MOVE HISTORY: ", previousLineMoveHistory);
	// 		const nextMoveForLine = await fetchNextMoveForComputer.fetchNextMove(previousLineMoveHistory, currentLineIndex);
	// 		console.log("NEXT MOVE FOR LINE: ", nextMoveForLine);

	// 		dispatch({ type: SET_NEXT_MOVE, payload: { currentLineIndex: currentLineIndex, nextMove: nextMoveForLine } });

	// 		dispatch({ type: INCREMENT_LINE });
	// 	})();
	// }, [currentLineIndex, gameState.moveHistories[currentLineIndex]]);
	return <ChessboardPresentation fen={fen} onMove={handleMove} />;
};


export default React.memo(ChessboardContainer);