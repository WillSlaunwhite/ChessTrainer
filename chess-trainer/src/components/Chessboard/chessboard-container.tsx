import React, { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, MAKE_MOVE_ALT_FORMAT, SET_BOARD_FROM_HISTORY } from "../../contexts/game/gameActions";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleUserMoveUpdate }) => {
	const [gameState, dispatch] = useGameState();
	const handleMove = useUserMoveLogic(handleUserMoveUpdate);
	const handleMoveUpdate = useHandleMoveUpdate(gameState, dispatch);
	const lineIndex = gameState.currentLineIndex;
	const currentFens = gameState.currentFens;
	const nextMove = gameState.reformattedMove.split(" ");

	// useEffect(() => {
	// 	if (nextMove.length > 0) {
	// 		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source: nextMove[0], destination: nextMove[1] } })
	// 		gameState.reformattedMove = "";
	// 	}
	// }, [nextMove]);

	useEffect(() => {
		console.log("CHESSBOARD NEXT MOVES: ", gameState.nextMoves);
		console.log("CHESSBOARD REFORMATTED MOVE: ", gameState.reformattedMove);
		if (gameState.nextMoves[lineIndex] !== "") {
			dispatch({
				type: MAKE_MOVE_ALT_FORMAT, payload: {
					move: gameState.nextMoves[lineIndex]
				}
			});
			gameState.nextMoves[lineIndex] = "";

			dispatch({ type: SET_BOARD_FROM_HISTORY });
		}
	}, [gameState.nextMoves[lineIndex]]);

	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
