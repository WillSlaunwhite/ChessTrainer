import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../contexts/game/game-context";
import { SET_CURRENT_LINE_NUMBER, SWITCH_LINES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState] = useQuiz();

	// * TODO IMPLEMENT THIS
	const checkMoveCorrectness = (move: string) => {
		return true;
	}

	const switchLine = (event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
		gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: lineNumber } });
		gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[lineNumber] } });
	}

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-5/6 w-full overflow-hidden absolute top-0">
			<MoveContainer moveHistories={gameState.moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={gameState.currentLineIndex} switchLines={switchLine} />
			<ChessboardContainer currentLineIndex={gameState.currentLineIndex} />
		</div>
	);
};

export default React.memo(GameView);

