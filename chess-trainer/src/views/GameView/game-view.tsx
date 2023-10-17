import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../contexts/game/game-context";
import { SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_READY_TO_MOVE, SWITCH_LINES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import MoveContainer from "./move-container";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";


const GameView: React.FC = () => {
	// state
	const [quizState] = useQuiz();
	const [gameState, gameDispatch] = useGameState();

	// variables
	const lineIndex = gameState.currentLineIndex;
	const nextMove = gameState.nextMoves[lineIndex];
	const readyToMove = gameState.isComputerReadyToMove;
	const moveHistories = gameState.moveHistories;

	// hooks
	const handleComputerMove = useComputerMoveLogic(nextMove);
	const handleMoveUpdate = useHandleMoveUpdate();
	const handleMove = useUserMoveLogic(handleMoveUpdate);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true } });
	}, [nextMove !== ""]);


	useEffect(() => {
		handleComputerMove.makeComputerMove();
	}, [readyToMove === true]);

	const switchLine = useCallback((_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: lineNumber } });
		gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[lineNumber] } });
	}, [gameDispatch, gameState.currentFens])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={gameState.currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer handleMove={handleMove.handleMove} />
		</div>
	);
};

export default React.memo(GameView);