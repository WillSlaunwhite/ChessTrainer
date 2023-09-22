import React, { useCallback, useState } from "react";
import ExplanationComponent from "../../components/Common/text/explanation";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { italianGameHungarian, italianGameMainLine, italianGameTwoKnights } from "../../models/constants";
import MoveContainer from "./move-container";
import SummaryComponent from "./summary";


const GameView: React.FC = () => {
	const [quizState, setQuizState] = useQuiz();
	const [moveHistories, setMoveHistories] = useState<string[][]>([[], [], []]);

	const [summary] = useState("");
	const showSummary = false;

	console.log("game view");

	const handleMove = useCallback(
		(move: string) => {
			const lines = [italianGameMainLine, italianGameTwoKnights, italianGameHungarian];
			const updatedQuizState = { ...quizState };
			const currentLine = lines[updatedQuizState.currentLine];
			const correctAnswer = currentLine.whiteMoves[updatedQuizState.currentMoveIndex];
			const updatedMoveHistories = [...moveHistories];
			console.log('current line ' + updatedQuizState.currentLine);

			updatedMoveHistories[updatedQuizState.currentLine].push(move);

			console.log('before ' + updatedQuizState.isCorrect);
			const updatedIsCorrect = [...updatedQuizState.isCorrect];
			if (move === correctAnswer) {
				updatedIsCorrect[updatedQuizState.currentLine] = true;
				console.log('after ' + updatedIsCorrect);
				updatedQuizState.score += 1;
			} else {
				updatedIsCorrect[updatedQuizState.currentLine] = false;
				console.log('wrong after ' + updatedIsCorrect);
				updatedQuizState.wrongMoves.push({ line: updatedQuizState.currentLine, move: updatedQuizState.currentMoveIndex });
			}

			if (updatedQuizState.currentLine < 2) {
				updatedQuizState.currentLine += 1;
			} else {
				updatedQuizState.currentLine = 0;
			}
			updatedQuizState.currentMoveIndex += 1;

			setMoveHistories(prevHistories => {
				const updatedHistories = [...prevHistories];
				updatedHistories[updatedQuizState.currentLine].push(move);
				return updatedHistories;
			})

			setQuizState(updatedQuizState);
		},
		[moveHistories, quizState, setQuizState],
	);

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			{showSummary && <SummaryComponent summary={summary} />}
			<ExplanationComponent
				explanation={
					quizState.isCorrect[quizState.currentMoveIndex]
						? italianGameMainLine.correctExplanations[quizState.currentMoveIndex]
						: italianGameMainLine.incorrectExplanations[quizState.currentMoveIndex]
				}
			/>
			<MoveContainer moveHistories={moveHistories} isCorrect={quizState.isCorrect} currentBlockIndex={quizState.currentLine} />
			<ChessboardContainer currentLineIndex={quizState.currentLine} handleMoveParent={handleMove} />
		</div>
	);
};

const GameViewMemo = React.memo(GameView);
export default GameViewMemo;
