import React, { useCallback, useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE_ALT_FORMAT, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_READY_TO_MOVE, SWITCH_LINES } from "../../store/game/actions/gameActions";
import { useQuiz } from "../../store/quiz/quiz-context";
import MoveContainer from "./move-container";

const GameView: React.FC = () => {
	// * state
	const [quizState] = useQuiz();
	const [gameState, gameDispatch] = useGameState();

	// * variables
	const moveHistories = gameState.moveHistories;
	const currentFens = gameState.currentFens;
	const currentLineIndex = gameState.currentLineIndex;
	const readyToMove = gameState.isComputerReadyToMove;
	const nextMove = gameState.nextMoves[currentLineIndex];
	const isComputerTurn = gameState.isComputerTurn;

	useEffect(() => {
		gameDispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: true } });
	}, [nextMove]);

	// * NEED TO FETCH NEXT MOVE AFTER CURRENT NEXT MOVE BECOMES EMPTY
	useEffect(() => {
		// const newMove = determineNextComputerMove(gameState.moveHistories[gameState.currentLineIndex])
	}, [nextMove === ""]);

	useEffect(() => {
		
	}, []);

	const switchLine = useCallback((_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: lineNumber } });
		gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[lineNumber] } });
		gameDispatch({ type: MAKE_MOVE_ALT_FORMAT, payload: { move: gameState.nextMoves[lineNumber] } })
	}, [gameDispatch, gameState.currentFens])

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={gameState.currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer currentFens={currentFens} currentLineIndex={currentLineIndex} isComputerTurn={isComputerTurn} nextMove={nextMove} readyToMove={readyToMove} />
		</div>
	);
};

export default React.memo(GameView);