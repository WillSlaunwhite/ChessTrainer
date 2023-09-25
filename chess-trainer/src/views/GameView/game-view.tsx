import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import ExplanationComponent from "../../components/Common/text/explanation";
import { useGameState } from "../../contexts/game/game-context";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { italianGameMainLine } from "../../models/constants";
import MoveContainer from "./move-container";
import { Button, ButtonGroup } from "@material-tailwind/react";
import { SWITCH_LINES } from "../../contexts/game/gameActions";
import { DECREMENT_LINE, INCREMENT_LINE, SET_CURRENT_LINE_NUMBER } from "../../contexts/quiz/quizActions";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState, quizDispatch] = useQuiz();

	const handleMoveGameView = () => {
		if (quizState.currentLineIndex < 2) {
			quizDispatch({ type: INCREMENT_LINE });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex + 1] } });
		}
		else {
			quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 0 } })
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[0] } });
		}
	}

	const switchLineForward = () => {
		if (quizState.currentLineIndex < 2) {
			quizDispatch({ type: INCREMENT_LINE });
			gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex + 1] } });
		}
		else {
			quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 0 } })
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

	console.log("GAME VIEW GAME STATE: ", gameState);

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
			<ChessboardContainer handleMoveParent={handleMoveGameView}/>
		</div>
	);
};

export default React.memo(GameView);