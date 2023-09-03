import { useState } from "react";
import ExplanationComponent from "../text/explanation";
import GameContainerComponent from "./game-container";
import QuizComponent from "./quiz";
import MoveContainer from "./move-container";

interface Question {
	fen: string;
	correctMove: string;
	correctExplanation: string;
	incorrectExplanation: string;
}

const questions: Question[] = [
	{
		fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
		correctMove: "c3",
		correctExplanation: "This move prepares d4 and gains central space.",
		incorrectExplanation: "c3 is the best move because it prepares d4 and gains central space.",
	},
	{
		fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
		correctMove: "Nf6",
		correctExplanation: "Develops a piece and attacks the e4 pawn.",
		incorrectExplanation: "Nf6 is the best move because it develops a piece and attacks the e4 pawn.",
	},
	{
		fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
		correctMove: "d3",
		correctExplanation: "This move supports the e4 pawn and prepares to develop the dark square bishop.",
		incorrectExplanation: "d3 is the best move because it supports the e4 pawn and prepares to develop the dark square bishop.",
	},
	{
		fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 5",
		correctMove: "d6",
		correctExplanation: "This move supports the e5 pawn and prepares to develop the dark square bishop.",
		incorrectExplanation: "d6 is the best move because it supports the e5 pawn and prepares to develop the dark square bishop.",
	},
	{
		fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 6",
		correctMove: "O-O",
		correctExplanation:
			"Castling is always a good idea if there are no immediate tactics or threats. It brings the king to safety and connects the rooks.",
		incorrectExplanation: "Castling is the best move because it brings the king to safety and connects the rooks.",
	},
	{
		fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 b - - 1 6",
		correctMove: "O-O",
		correctExplanation:
			"Castling is always a good idea if there are no immediate tactics or threats. It brings the king to safety and connects the rooks.",
		incorrectExplanation: "Castling is the best move because it brings the king to safety and connects the rooks.",
	},
	{
		fen: "r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 2 7",
		correctMove: "Nbd2",
		correctExplanation: "Develops a piece, supports e4, and prepares to reroute the knight to a better square.",
		incorrectExplanation:
			"Nbd2 is the best move because it develops a piece, supports e4, and prepares to reroute the knight to a better square.",
	},
];

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
			<ExplanationComponent explanation={isCorrect ? questions[currentBlockIndex].correctExplanation : questions[currentBlockIndex].incorrectExplanation} />
			<MoveContainer isCorrect={isCorrect} currentBlockIndex={currentBlockIndex} moveHistories={moveHistories}/>
			<GameContainerComponent fen={fen} setFen={setFen} onMove={handleMove} />
		</div>
	);
};

export default GameView;
