import { Spinner } from "@material-tailwind/react";
import React, { useCallback, useEffect, useState } from "react";
import BoardEvaluation from "../../components/BoardEvaluation/BoardEvaluation";
import ChessboardContainer from "../../components/Chessboard/ChessboardContainer";
import Timer from "../../components/Common/misc/Timer";
import MoveContainer from "../../components/MoveBlock/MoveContainer";
import { useGameState } from "../../store/game/contexts/GameContext";
import { SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, UPDATE_EVALUATION } from "../../store/game/types/actionTypes";
import { useQuiz } from "../../store/quiz/quiz-context";
import { isComputersTurn } from "../../utility/chessUtils";
import { useComputerMoveLogic } from "../../utility/hooks/useComputerMoveLogic";
import { useFetchEvaluation } from "../../utility/hooks/useFetchEvaluation";
import { useFetchNextMoveForComputer } from "../../utility/hooks/useFetchNextMoveForComputer";
import { useHandleLineSwitch } from "../../utility/hooks/useHandleLineSwitch";

const GameView: React.FC = () => {
	// * state
	const [quizState, _quizDispatch] = useQuiz();
	const [gameState, gameDispatch] = useGameState();
	const [lastFetchedMove, setLastFetchedMove] = useState<string>("");

	// * hooks
	const computerMoveLogic = useComputerMoveLogic();
	const switchLines = useHandleLineSwitch();
	const fetchNextMoveForComputer = useFetchNextMoveForComputer();
	const fetchEvaluation = useFetchEvaluation();

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
				computerMoveLogic.makeComputerMove(nextMove, line.fen);
				gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: false, currentLineIndex: currentLineIndex } });
			}, 1000);
		}
	}, [nextMove, readyToMove, isComputerTurn, line.fen]);

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true, currentLineIndex: currentLineIndex } });
		gameDispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: isComputersTurn(line.moveHistory, line.computerColor), currentLineIndex: currentLineIndex } })
	}, [nextMove]);

	useEffect(() => {
		const latestMove = line.moveHistory.slice(-1)[0];

		if (line.fen && latestMove && latestMove !== lastFetchedMove) {
			const fetchBoardEvaluation = async () => {
				if (line.fen && line.moveHistory) {
					const { bestMove, centipawns, principalVariation } = await fetchEvaluation.fetchPositionEvaluation(line.fen, latestMove);
					const turn = line.fen.split(" ")[1];
					const adjustedCentipawns = turn === 'b' ? -centipawns : centipawns;
					gameDispatch({ type: UPDATE_EVALUATION, payload: { lineIndex: currentLineIndex, evaluation: adjustedCentipawns } });
					setLastFetchedMove(latestMove);
				}
			};

			fetchBoardEvaluation();
		}
	}, [line.fen, line.moveHistory, lastFetchedMove]);


	const switchLine = useCallback(async (_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		switchLines.handleLineSwitch(lineNumber);
	}, [gameDispatch, gameState.lines]);

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={currentLineIndex} switchLines={switchLine} />
			<BoardEvaluation centipawns={line.evaluation} />
			{isComputerTurn && <Spinner className="h-16 w-16 p-2 text-gray-900/50" />}
			<ChessboardContainer fen={line.fen} />
			<Timer key={currentLineIndex} initialTime={5} />
		</div>
	);
};

export default React.memo(GameView);