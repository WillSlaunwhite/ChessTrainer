import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../contexts/game/game-context";
import { SWITCH_LINES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { SET_CURRENT_LINE_NUMBER } from "../../contexts/quiz/quizActions";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState, quizDispatch] = useQuiz();
	const handleMoveUpdate = useHandleMoveUpdate(gameState, quizState, gameDispatch, quizDispatch);

	// * TODO IMPLEMENT THIS
	const checkMoveCorrectness = (move: string) => {
		return true;
	}

	const switchLine = (event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: lineNumber } });
		gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[lineNumber] } });
	}

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={gameState.moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={quizState.currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer handleUserMoveUpdate={handleMoveUpdate} currentLineIndex={quizState.currentLineIndex} />
		</div>
	);
};

export default React.memo(GameView);

