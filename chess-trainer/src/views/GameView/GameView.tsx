import { Spinner } from "@material-tailwind/react";
import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import Timer from "../../components/Common/misc/Timer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import { useGameState } from "../../store/game/contexts/GameContext";
import { SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE } from "../../store/game/types/actionTypes";
import { useQuiz } from "../../store/quiz/quiz-context";
import { isComputersTurn } from "../../utility/chessUtils";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useFetchNextMoveForComputer } from "../../utility/hooks/useFetchNextMoveForComputer";
import { useHandleLineSwitch } from "../../utility/hooks/useHandleLineSwitch";

const GameView: React.FC = () => {
	// * state
	const [quizState, _quizDispatch] = useQuiz();
	const [gameState, gameDispatch] = useGameState();

	// * hooks
	const computerMoveLogic = useComputerMoveLogic();
	const switchLines = useHandleLineSwitch();
	const fetchNextMoveForComputer = useFetchNextMoveForComputer();

	// * variables
	const currentLineIndex = gameState.global.currentLineIndex;
	const line = gameState.lines[currentLineIndex];
	const readyToMove = line.isComputerReadyToMove;
	const nextMove = line.nextMove;
	const isComputerTurn = line.isComputerTurn;
	const moveHistories = gameState.lines.map((line) => line.moveHistory);

	useEffect(() => {
		const fetchComputerMove = async () => {
			if (isComputerTurn && !nextMove) {
				const nextComputerMove = await fetchNextMoveForComputer.fetchNextMove(moveHistories[currentLineIndex]);

				if (nextComputerMove) {
					gameDispatch({
						type: SET_NEXT_MOVE,
						payload: {
							currentLineIndex: currentLineIndex,
							nextMove: nextComputerMove
						}
					});
				}
			}
		};

		fetchComputerMove();
	}, [gameState, isComputerTurn, nextMove]);

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

	const switchLine = useCallback(async (_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		switchLines.handleLineSwitch(lineNumber);

		const previousLineNumber = lineNumber === 0 ? 2 : lineNumber - 1;
		const nextMove = await fetchNextMoveForComputer.fetchNextMove(gameState.lines[previousLineNumber].moveHistory);
		console.log(nextMove);
		gameDispatch({ type: SET_NEXT_MOVE, payload: { nextMove: nextMove, currentLineIndex: previousLineNumber } });
	}, [gameDispatch, gameState.lines])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} switchLines={switchLine} />
			{isComputerTurn && <Spinner className="h-16 w-16 text-gray-900/50" />}
			<ChessboardContainer fen={line.fen} />
			<Timer initialTime={5} />
		</div>
	);
};

export default React.memo(GameView);