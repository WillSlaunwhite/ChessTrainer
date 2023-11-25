import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import { SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SWITCH_LINE } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";
import { useQuiz } from "../../store/quiz/quiz-context";
import { isComputersTurn } from "../../utility/chessUtils";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";

const GameView: React.FC = () => {
	// * state
	const [quizState] = useQuiz();
	const [gameState, gameDispatch] = useGameState();

	// * hooks
	const computerMoveLogic = useComputerMoveLogic();
	const userMoveLogic = useUserMoveLogic();

	// * variables
	const currentLineIndex = gameState.global.currentLineIndex;
	const line = gameState.lines[currentLineIndex];
	const readyToMove = line.isComputerReadyToMove;
	const nextMove = line.nextMove;
	const isComputerTurn = line.isComputerTurn;
	const moveHistories = gameState.lines.map((line) => line.moveHistory);

	useEffect(() => {
		if (nextMove && readyToMove && isComputerTurn) {
			computerMoveLogic.makeComputerMove(nextMove, line.fen)
		}
	}, [nextMove, readyToMove, isComputerTurn]);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true, currentLineIndex: currentLineIndex } });
		gameDispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: isComputersTurn(line.moveHistory, line.computerColor), currentLineIndex: currentLineIndex } })
	}, [nextMove]);

	const switchLine = useCallback((_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SWITCH_LINE, payload: { lineIndex: lineNumber } });
	}, [gameDispatch, gameState.lines])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer fen={line.fen} handleMove={userMoveLogic.handleMove} />
		</div>
	);
};

export default React.memo(GameView);