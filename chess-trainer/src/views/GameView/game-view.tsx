import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE_ALT_FORMAT, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_TURN, SWITCH_LINES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import MoveContainer from "./move-container";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState] = useQuiz();
	const lineIndex = gameState.currentLineIndex;
	const nextMove = gameState.nextMoves[lineIndex];
	const handleMoveUpdate = useHandleMoveUpdate(gameState, gameDispatch);
	const handleComputerMove = useComputerMoveLogic(nextMove);
	console.log("GAME VIEW REFORMATTED MOVE: ", gameState.reformattedMove);
	console.log("GAME VIEW IS COMPUTER TURN: ", gameState.isComputerTurn);

	useEffect(() => {
		if (nextMove !== "" && gameState.isComputerTurn) {
			console.log("GAME VIEW USE EFFECT: ", gameState.isComputerTurn);
			handleComputerMove.makeComputerMove();
			gameState.reformattedMove = "";
			// gameDispatch({
			// 	type: MAKE_MOVE_ALT_FORMAT, payload: {
			// 		move: gameState.nextMoves[lineIndex]
			// 	}
			// });
			// gameDispatch({ type: SET_BOARD_FROM_HISTORY });
			// gameDispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: false } });
		}
	}, []);


	useEffect(() => {
		console.log("CHESSBOARD NEXT MOVES: ", gameState.nextMoves);
		console.log("CHESSBOARD REFORMATTED MOVE: ", gameState.reformattedMove);
		// if (nextMove !== "") {
		// 	gameState.nextMoves[lineIndex] = "";

		// }
	}, [gameState.nextMoves[lineIndex]]);



	// * TODO IMPLEMENT THIS
	const checkMoveCorrectness = (move: string) => {
		return true;
	}

	const switchLine = useCallback((event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: lineNumber } });
		gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[lineNumber] } });
	}, [gameDispatch, gameState.currentFens])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={gameState.moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={gameState.currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer handleUserMoveUpdate={handleMoveUpdate} />
		</div>
	);
};

export default React.memo(GameView);

function fetchProbableMoves() {
	throw new Error("Function not implemented.");
}

