import React, { useEffect } from "react";
import ChessboardContainer from "../../components/Chessboard/chessboard-container";
import { useGameState } from "../../contexts/game/game-context";
import { SET_CURRENT_LINE_NUMBER, SET_NEXT_MOVE, SWITCH_LINES } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import { extractMoveDetails } from "../../utility/chessUtils";
import { useHandleComputerMove } from "../../utility/hooks/useHandleComputerMove";
import { useHandleMoveUpdate } from "../../utility/hooks/useHandleMoveUpdate";
import MoveContainer from "./move-container";


const GameView: React.FC = () => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState] = useQuiz();
	const handleMoveUpdate = useHandleMoveUpdate(gameState, gameDispatch);
	const fetchProbableMoves = useHandleComputerMove();

	const currentFens = gameState.currentFens;
	const moveHistories = gameState.moveHistories;

	useEffect(() => {
		console.log("HELLO2");
		
		const potentialMoves = fetchProbableMoves();
		const nextMovePair = potentialMoves[gameState.currentLineIndex];
		if (nextMovePair) {
			const computerMove = extractMoveDetails(nextMovePair.move)[1];
			gameDispatch({ type: SET_NEXT_MOVE, payload: { nextMove: computerMove, lineIndex: gameState.currentLineIndex } });
		}
	}, [moveHistories]);

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
			<ChessboardContainer handleUserMoveUpdate={handleMoveUpdate} />
		</div>
	);
};

export default React.memo(GameView);

function fetchProbableMoves() {
	throw new Error("Function not implemented.");
}

