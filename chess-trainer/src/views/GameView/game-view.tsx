import React from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import ExplanationComponent from "../../components/Common/text/explanation";
import { useGameState } from "../../contexts/game/game-context";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { italianGameMainLine } from "../../models/constants";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState] = useGameState();
	const [quizState] = useQuiz();

	console.log("########################### INITIAL MOVES IN GAME VIEW: ", gameState.initialMoves);

	// const handleMove = useCallback(
	// 	(source: string, destination: string) => {
	// 		gameDispatch({
	// 			type: MAKE_MOVE, payload: {
	// 				source,
	// 				destination,
	// 				currentLineIndex: quizState.currentLineIndex
	// 			}
	// 		});
	// 	},
	// 	[quizDispatch, gameDispatch],
	// );

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			<ExplanationComponent
				explanation={
					quizState.isCorrect[quizState.currentMoveIndex]
						? italianGameMainLine.correctExplanations[quizState.currentMoveIndex]
						: italianGameMainLine.incorrectExplanations[quizState.currentMoveIndex]
				}
			/>
			<MoveContainer moveHistories={gameState.initialMoves} isCorrect={quizState.isCorrect} currentBlockIndex={quizState.currentLineIndex} />
			<ChessboardContainer />
		</div>
	);
};

export default React.memo(GameView);