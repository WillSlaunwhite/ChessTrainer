import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import { MAKE_MOVE_ALT_FORMAT, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_READY_TO_MOVE, SWITCH_LINE } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";
import { useQuiz } from "../../store/quiz/quiz-context";

const GameView: React.FC = () => {
	// * state
	const [quizState] = useQuiz();
	const [gameState, gameDispatch] = useGameState();

	// * variables
	const currentLineIndex = gameState.global.currentLineIndex;
	const line = gameState.lines[currentLineIndex];
	const readyToMove = line.isComputerReadyToMove;
	const nextMove = line.nextMove;
	const isComputerTurn = line.isComputerTurn;
	const moveHistories = gameState.lines.map(line => line.moveHistory);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true } });
	}, [nextMove]);

	const switchLine = useCallback((_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: lineNumber } });
		gameDispatch({ type: SWITCH_LINE, payload: { lineIndex: lineNumber } });
		gameDispatch({ type: MAKE_MOVE_ALT_FORMAT, payload: { move: nextMove } })
	}, [gameDispatch, gameState.lines])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer fen={line.fen} currentLineIndex={currentLineIndex} isComputerTurn={isComputerTurn} nextMove={nextMove} readyToMove={readyToMove} />
		</div>
	);
};

export default React.memo(GameView);