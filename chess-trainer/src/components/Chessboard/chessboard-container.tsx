import React, { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE_ALT_FORMAT } from "../../contexts/game/gameActions";
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
	const nextMove = gameState.reformattedMove;

	useEffect(() => {
		if (nextMove !== "") {
			console.log("IN NEXT MOVE");
			
			handleMoveUpdate;
			gameState.reformattedMove = "";
		}
	}, [nextMove]);

	useEffect(() => {
		console.log("CHESSBOARD NEXT MOVES: ", gameState.nextMoves);
		console.log("CHESSBOARD REFORMATTED MOVE: ", gameState.reformattedMove);
		if (gameState.nextMoves[lineIndex] !== "") {
			dispatch({
				type: MAKE_MOVE_ALT_FORMAT, payload: {
					move: gameState.initialMoves[lineIndex]
				}
			});
			gameState.nextMoves[lineIndex] = "";
		}
	});

	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleMove.handleMove} />;
};


export default React.memo(ChessboardContainer);
