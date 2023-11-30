import React from "react";
import ChessboardPresentation from "./ChessboardPresentation";

interface ChessboardContainerProps {
	fen: string;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ fen }) => {
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
	return <ChessboardPresentation fen={fen} />;
};


export default React.memo(ChessboardContainer);
