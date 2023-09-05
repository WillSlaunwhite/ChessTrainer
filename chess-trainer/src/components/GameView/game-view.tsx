import React, { useCallback, useState } from "react";
import { BoardProvider } from "../../contexts/board-context";
import { ChessboardInteractionProvider } from "../../contexts/chess-context";
import { HistoryProvider } from "../../contexts/history-context";
import { italianGameMainLine } from "../../models/constants";
import ChessboardContainer from "../chessboard/chessboard-container";
import ExplanationComponent from "../text/explanation";
import MoveContainer from "./move-container";
import SummaryComponent from "./summary";

interface GameViewProps {
	setIsQuizActive: (isActive: boolean) => void;
}

const GameView: React.FC<GameViewProps> = () => {
	const [moveHistories, setMoveHistories] = useState<string[][]>([[], [], []]);
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
	const [summary] = useState("");
	const showSummary = false;
	const questions = italianGameMainLine;
	console.log("game view");

	const handleMove = useCallback(
		(move: string) => {
			const tempCurrentBlockIndex = currentBlockIndex;

			const updatedMoveHistories = [...moveHistories];
			updatedMoveHistories[currentBlockIndex].push(move);
			setMoveHistories(updatedMoveHistories);

			const updatedIsCorrect = [...isCorrect];
			if (move === questions.whiteMoves[tempCurrentBlockIndex]) {
				updatedIsCorrect[tempCurrentBlockIndex] = true;
				setScore(score + 1);
			} else {
				updatedIsCorrect[tempCurrentBlockIndex] = false;
			}
			console.log("current block index " + currentBlockIndex);
			console.log("temp block index " + tempCurrentBlockIndex);

			console.log(updatedIsCorrect);

			setIsCorrect(updatedIsCorrect);

			if (currentBlockIndex >= 2) {
				// const emptyArr: boolean | null[] = [];
				// emptyArr.fill(null);
				setIsCorrect(new Array(3).fill(null));
				if (moveHistories[currentBlockIndex].length == questions.whiteMoves.length) {
					// summary
				}
				setCurrentBlockIndex(0);
				console.log("before isCorrect " + isCorrect);

				console.log("after " + isCorrect);
			} else {
				setCurrentBlockIndex(currentBlockIndex + 1);
			}
		},
		[currentBlockIndex, isCorrect, moveHistories, questions.whiteMoves, score],
	);

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			{showSummary && <SummaryComponent summary={summary} />}
			<ExplanationComponent
				explanation={
					isCorrect ? questions.correctExplanations[] : questions.incorrectExplanations[moveHistories.length]
				}
			/>
			<MoveContainer isCorrect={isCorrect} currentBlockIndex={currentBlockIndex} moveHistories={moveHistories} />
			<ChessboardInteractionProvider>
				<BoardProvider>
					<HistoryProvider>
						<ChessboardContainer handleMoveParent={handleMove} />
					</HistoryProvider>
				</BoardProvider>
			</ChessboardInteractionProvider>
		</div>
	);
};

const GameViewMemo = React.memo(GameView);
export default GameViewMemo;
