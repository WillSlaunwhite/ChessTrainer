import { useState } from "react";
import ChessboardComponent from "../chessboard/chessboard";
import ExplanationComponent from "../text/explanation";
import MoveContainer from "./move-container";
import SummaryComponent from "./summary";
import { italianGameLines, questions } from "../../models/constants";


interface GameViewProps {
	fen: string;
	setFen: (fen: string) => void;
	setIsQuizActive: (isActive: boolean) => void;
}

const GameView: React.FC<GameViewProps> = ({ fen, setFen, setIsQuizActive }) => {
	const [moveHistories, setMoveHistories] = useState<string[][]>([[], [], []]);
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [isCorrect, setIsCorrect] = useState<boolean[]>([]);
	const [summary, setSummary] = useState("");
	const showSummary = false;

	const updateMoveHistory = (move: string) => {
		const updatedMoveHistories = [...moveHistories];
		updatedMoveHistories[currentBlockIndex].push(move);
		setMoveHistories(updatedMoveHistories);
	}

	const checkIfCorrect = (move: string) => {
		const updatedIsCorrect = [...isCorrect];
		if (move === questions[currentBlockIndex].correctMove) {
			updatedIsCorrect[currentBlockIndex] = true;
			setScore(score + 1);
		} else {
			updatedIsCorrect[currentBlockIndex] = false;
		}
		setIsCorrect(updatedIsCorrect);
	}

	const checkForReset = () => {
		if (currentBlockIndex === 2) {
			if(moveHistories[currentBlockIndex].length == questions.length) {
				// summary
			}
			setCurrentBlockIndex(0);
			setIsCorrect(new Array(3).fill(null));
		} else {
			setCurrentBlockIndex(currentBlockIndex + 1);
		}
	}

	const handleMove = (move: string) => {
		updateMoveHistory(move);
		checkIfCorrect(move);
		checkForReset();
	};

	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			{ showSummary && <SummaryComponent summary={summary} />}
			<ExplanationComponent explanation={isCorrect ? questions[currentBlockIndex].correctExplanation : questions[currentBlockIndex].incorrectExplanation} />
			<MoveContainer isCorrect={isCorrect} currentBlockIndex={currentBlockIndex} moveHistories={moveHistories}/>
			<ChessboardComponent fen={fen} setFen={setFen} onMove={handleMove} />
		</div>
	);
};

export default GameView;
