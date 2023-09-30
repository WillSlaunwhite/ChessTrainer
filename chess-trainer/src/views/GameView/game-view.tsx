import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import ExplanationComponent from "../../components/Common/text/explanation";
import { useGameState } from "../../contexts/game/game-context";
import { SET_BOARD_FROM_HISTORY, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { INCREMENT_LINE, INCREMENT_MOVE, SET_CURRENT_LINE_NUMBER } from "../../contexts/quiz/quizActions";
import { italianGameMainLine } from "../../utility/constants";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState, quizDispatch] = useQuiz();

	const handleMoveUpdate = (newMove: string) => {
		console.log("IN GAME VIEW, GAME STATE MOVE HISTORIES: ", gameState.moveHistories);

		const updatedMoveHistories = Object.values(gameState.moveHistories);
		updatedMoveHistories[quizState.currentLineIndex].push(newMove);

		gameDispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: updatedMoveHistories } });
		gameDispatch({ type: SET_BOARD_FROM_HISTORY, payload: { moveHistory: updatedMoveHistories[quizState.currentLineIndex], lineIndex: quizState.currentLineIndex } });

		quizDispatch({ type: INCREMENT_MOVE });

		if (quizState.currentLineIndex < 2) {
			quizDispatch({ type: INCREMENT_LINE });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex + 1] } });
		}
		else {
			quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 0 } })
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[0] } });
		}
	}


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
			<ExplanationComponent
				explanation={
					quizState.isCorrect[quizState.currentMoveIndex]
						? italianGameMainLine.correctExplanations[quizState.currentMoveIndex]
						: italianGameMainLine.incorrectExplanations[quizState.currentMoveIndex]
				}
			/>
			<ChessboardContainer handleMoveParent={handleMoveUpdate} currentLineIndex={quizState.currentLineIndex} />
		</div>
	);
};

export default React.memo(GameView);

