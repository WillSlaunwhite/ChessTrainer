import React from "react";
import { useGameState } from "../../contexts/game/game-context";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	handleMove: (source: string, destination: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleMove }) => {
	const [gameState, _dispatch] = useGameState();
	
	const lineIndex = gameState.currentLineIndex;
	const currentFens = gameState.currentFens;

	// useEffect(() => {
	// 	if (nextMove.length > 0) {
	// 		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source: nextMove[0], destination: nextMove[1] } })
	// 		gameState.reformattedMove = "";
	// 	}
	// }, [nextMove]);

	// useEffect(() => {
	// 	console.log("CHESSBOARD NEXT MOVES: ", gameState.nextMoves);
	// 	console.log("CHESSBOARD REFORMATTED MOVE: ", gameState.reformattedMove);
	// 	if (nextMove !== "") {
	// 		dispatch({
	// 			type: MAKE_MOVE_ALT_FORMAT, payload: {
	// 				move: gameState.nextMoves[lineIndex]
	// 			}
	// 		});
	// 		gameState.nextMoves[lineIndex] = "";

	// 		dispatch({ type: SET_BOARD_FROM_HISTORY });
	// 		dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: false } });
	// 	}
	// }, [gameState.nextMoves[lineIndex]]);

	return <ChessboardPresentation fen={currentFens[lineIndex]} onMove={handleMove} />;
};


export default React.memo(ChessboardContainer);
