import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import { SELECT_SQUARE, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SWITCH_LINE } from "../../store/game/types/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";
import { useQuiz } from "../../store/quiz/quiz-context";
import { getLastMoveSquares, isComputersTurn } from "../../utility/chessUtils";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useUserMoveLogic } from "../../utility/hooks/useUserMoveLogic";
import { Spinner } from "@material-tailwind/react";
import Timer from "../../components/Common/misc/Timer";

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
			setTimeout(() => {
				computerMoveLogic.makeComputerMove(nextMove, line.fen)
			}, 1000);
		}
	}, [nextMove, readyToMove, isComputerTurn]);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true, currentLineIndex: currentLineIndex } });
		gameDispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: isComputersTurn(line.moveHistory, line.computerColor), currentLineIndex: currentLineIndex } })
	}, [nextMove]);

	useEffect(() => {
		if (line.fen && line.moveHistory.length > 0) {
			console.log(line.moveHistory);
			const lastMoves = getLastMoveSquares(line.moveHistory);
			console.log(lastMoves);
		}
	}, [line.fen, line.moveHistory]);

	const switchLine = useCallback((_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SWITCH_LINE, payload: { lineIndex: lineNumber } });
	}, [gameDispatch, gameState.lines])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} switchLines={switchLine} />
			{isComputerTurn && <Spinner className="h-16 w-16 text-gray-900/50" />}
			<ChessboardContainer fen={line.fen} handleMove={userMoveLogic.handleMove} />
			<Timer initialTime={5} />
		</div>
	);
};

export default React.memo(GameView);