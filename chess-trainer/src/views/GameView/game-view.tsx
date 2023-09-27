import { Button, ButtonGroup } from "@material-tailwind/react";
import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import ExplanationComponent from "../../components/Common/text/explanation";
import { useGameState } from "../../contexts/game/game-context";
import { SET_BOARD_FROM_ACTION, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { DECREMENT_LINE, INCREMENT_LINE, INCREMENT_MOVE, SET_CURRENT_LINE_NUMBER, UPDATE_CORRECTNESS } from "../../contexts/quiz/quizActions";
import { italianGameMainLine } from "../../models/constants";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState, quizDispatch] = useQuiz();

	const handleMoveUpdate = (newMove: string) => {
		const updatedMoveHistories = [...gameState.moveHistories];
		updatedMoveHistories[quizState.currentLineIndex].push(newMove);
		console.log("################# UPDATED MOVE HISTORIES: ", updatedMoveHistories);
		console.log("################# NEW MOVE: ", newMove);

		gameDispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: updatedMoveHistories } });
		gameDispatch({ type: SET_BOARD_FROM_ACTION, payload: { moveHistory: updatedMoveHistories[quizState.currentLineIndex]} });

		// const isMoveCorrect = checkMoveCorrectness(updatedMoveHistories[quizState.currentLineIndex][quizState.currentMoveIndex]);

		// const updatedIsCorrect = [...quizState.isCorrect];
		// updatedIsCorrect[quizState.currentMoveIndex] = isMoveCorrect
		// quizDispatch({ type: UPDATE_CORRECTNESS, payload: { isCorrect: updatedIsCorrect } });

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

	const switchLineForward = () => {
		if (quizState.currentLineIndex < 2) {
			quizDispatch({ type: INCREMENT_LINE });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex + 1] } });
		}
		else {
			quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 0 } });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[0] } });
		}
	}

	const switchLineBackward = () => {
		if (quizState.currentLineIndex > 0) {
			quizDispatch({ type: DECREMENT_LINE });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex - 1] } })
		}
		else {
			quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 2 } })
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[2] } })
		}
	}

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			<div className="line-switcher">
				<ButtonGroup>
					<Button onClick={() => switchLineBackward()}>backward</Button>
					<Button onClick={() => switchLineForward()}>forward</Button>
				</ButtonGroup>
			</div>
			<ExplanationComponent
				explanation={
					quizState.isCorrect[quizState.currentMoveIndex]
						? italianGameMainLine.correctExplanations[quizState.currentMoveIndex]
						: italianGameMainLine.incorrectExplanations[quizState.currentMoveIndex]
				}
			/>
			<MoveContainer moveHistories={gameState.moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={quizState.currentLineIndex} />
			<ChessboardContainer handleMoveParent={handleMoveUpdate} currentLineIndex={quizState.currentLineIndex} />
		</div>
	);
};

export default React.memo(GameView);

