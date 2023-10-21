import React, { useEffect } from "react";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	currentFens: string[];
	currentLineIndex: number;
	isComputerTurn: boolean;
	nextMove: string;
	readyToMove: boolean;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ currentFens, currentLineIndex, isComputerTurn, nextMove, readyToMove }) => {
	// * hooks
	const handleComputerMove = useComputerMoveLogic();
	const handleUserMove = useUserMoveLogic();


	useEffect(() => {
		if (readyToMove === true && nextMove !== "" && isComputerTurn === true) {
			handleComputerMove.makeComputerMove(nextMove);
		}
	}, [nextMove, readyToMove, isComputerTurn]);

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
	return <ChessboardPresentation fen={currentFens[currentLineIndex]} onMove={handleUserMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
