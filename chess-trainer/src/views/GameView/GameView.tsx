import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import BoardEvaluation from "../../components/BoardEvaluation/BoardEvaluation";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import Timer from "../../components/common/misc/Timer";
import { useGameState } from "../../store/game/contexts/GameContext";
import { SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN } from "../../store/game/types/actionTypes";
import { useQuiz } from "../../store/quiz/quiz-context";
import { getLastMoveSquares, isComputersTurn } from "../../utility/chessUtils";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useFetchEvaluation } from "../../utility/hooks/useFetchEvaluation";
import { useFetchNextMoveForComputer } from "../../utility/hooks/useFetchNextMoveForComputer";
import UndoButton from "../../components/common/buttons/UndoButton";

const GameView: React.FC = () => {
	// * state
	const [quizState, _quizDispatch] = useQuiz();
	const [gameState, gameDispatch] = useGameState();
	const [lastFetchedMove, setLastFetchedMove] = useState<string>("");

	// * hooks
	const computerMoveLogic = useComputerMoveLogic();
	const fetchNextMoveForComputer = useFetchNextMoveForComputer(gameDispatch);
	const fetchEvaluation = useFetchEvaluation();

	// * variables
	const currentLineIndex = gameState.global.currentLineIndex;
	const line = gameState.lines[currentLineIndex];
	const readyToMove = line.isComputerReadyToMove;
	const nextMove = line.nextMove;
	const isComputerTurn = line.isComputerTurn;
	const moveHistories = gameState.lines.map((line) => line.moveHistory);
	const toSquare =  line.moveHistory.length > 1 ? getLastMoveSquares(line.moveHistory).to : ""; 
	const timerStart = gameState.global.timerStart;
	const timerReset = gameState.global.timerStart;

	useEffect(() => {
		if (nextMove && readyToMove && isComputerTurn) {
			setTimeout(() => {
				computerMoveLogic.makeComputerMove(nextMove, line.fen);
			}, 1000);
		}
	}, [nextMove, readyToMove, isComputerTurn, line.fen, timerStart]);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true, currentLineIndex: currentLineIndex } });
		gameDispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: isComputersTurn(line.moveHistory, line.computerColor), currentLineIndex: currentLineIndex } })
	}, [nextMove, readyToMove, isComputerTurn]);

	useEffect(() => {
		if (isComputerTurn && !nextMove) {
			const fetchNextMove = async () => {
				await fetchNextMoveForComputer.fetchNextMove(line.moveHistory, line.fen, currentLineIndex);
			};
			fetchNextMove();
		}
	}, [isComputerTurn, nextMove, line.moveHistory, line.fen]);

	useEffect(() => {
		const latestMove = line.moveHistory.slice(-1)[0];
		if (line.fen && latestMove && latestMove !== lastFetchedMove) {
			const fetchBoardEvaluation = async () => {
				await fetchEvaluation.fetchPositionEvaluation(line.fen, latestMove);
				setLastFetchedMove(latestMove);
			};
			fetchBoardEvaluation();
		}
	}, [line.fen, line.moveHistory, lastFetchedMove]);

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} />
			<BoardEvaluation centipawns={line.evaluation} isComputerTurn={isComputerTurn}/>
			<ChessboardContainer fen={line.fen} highlightedSquares={gameState.global.highlightedSquares} selectedSquare={gameState.global.selectedSquare} toSquare={toSquare} />
			<Timer key={currentLineIndex} initialTime={5} reset={timerReset} start={timerStart} />
			<UndoButton moveHistory={line.moveHistory} />
		</div>
	);
};

export default React.memo(GameView);