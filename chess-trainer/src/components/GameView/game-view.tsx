import { Chess } from "chess.js";
import React, { useCallback, useState } from "react";
import { questions } from "../../models/constants";
import ChessboardContainer from "../chessboard/chessboard-container";
import ExplanationComponent from "../text/explanation";
import { ChessboardInteractionProvider } from "./chess-context";
import MoveContainer from "./move-container";
import SummaryComponent from "./summary";
import { BoardProvider } from "./board-context";
import { HistoryProvider } from "./history-context";

interface GameViewProps {
	setIsQuizActive: (isActive: boolean) => void;
	chess: Chess;
}

const GameView: React.FC<GameViewProps> = () => {
	const [moveHistories, setMoveHistories] = useState<string[][]>([[], [], []]);
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
	const [summary, setSummary] = useState("");
	const showSummary = false;
	console.log("game view");

	const handleMove = useCallback(
		(move: string) => {
			if (currentBlockIndex === 2) {
				if (moveHistories[currentBlockIndex].length == questions.length) {
					// summary
				}
				setCurrentBlockIndex(0);
				setIsCorrect(new Array(3).fill(null));
			} else {
				setCurrentBlockIndex(currentBlockIndex + 1);
			}

			const updatedMoveHistories = [...moveHistories];
			updatedMoveHistories[currentBlockIndex].push(move);
			setMoveHistories(updatedMoveHistories);

			const updatedIsCorrect = [...isCorrect];
			if (move === questions[currentBlockIndex].correctMove) {
				updatedIsCorrect[currentBlockIndex] = true;
				setScore(score + 1);
			} else {
				updatedIsCorrect[currentBlockIndex] = false;
			}
			setIsCorrect(updatedIsCorrect);
		},
		[currentBlockIndex, isCorrect, moveHistories, score],
	);

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			{showSummary && <SummaryComponent summary={summary} />}
			<ExplanationComponent
				explanation={
					isCorrect ? questions[currentBlockIndex].correctExplanation : questions[currentBlockIndex].incorrectExplanation
				}
			/>
			<MoveContainer isCorrect={isCorrect} currentBlockIndex={currentBlockIndex} moveHistories={moveHistories} />
			<ChessboardInteractionProvider>
				<BoardProvider>
					<HistoryProvider>
						<ChessboardContainer />
					</HistoryProvider>
				</BoardProvider>
			</ChessboardInteractionProvider>
		</div>
	);
};

export default React.memo(GameView);
