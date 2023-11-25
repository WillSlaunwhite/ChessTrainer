import React from "react";
import { getBorderColor } from "../../utility/uiUtils";
import MoveHistory from "./MoveHistory";

interface MoveProps {
	isCorrect: boolean | null;
	moveHistory: string[];
	isCurrent: boolean;
	currentIndex: number;
	onClick: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
	blockNumber: number;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistory, isCurrent, onClick, blockNumber }) => {
	// const [gameState, dispatch] = useGameState();
	// const nextMove = gameState.nextMoves[blockNumber];
	// const fetchNextComputerMove = useFetchNextMoveForComputer();
	// const [prevLineIndex, setPrevLineIndex] = useState<number>(gameState.currentLineIndex);

	// useEffect(() => {
	// 	console.log("IN SET COMPUTER TURN USE EFFECT************");
	// 	if (isComputersTurn(moveHistory, gameState.computerColor) && isCurrent) {
			
	// 		dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: true } });
	// 	};
	// }, []);

	// useEffect(() => {
	// 	console.log("IN MOVE BLOCK USE EFFECT: ", nextMove);

	// 	// The line was switched
	// 	const previousLineMoves = gameState.moveHistories[prevLineIndex];

	// 	// Fetch the next move for the computer for the previous line
	// 	(async () => {
	// 		const nextMoveForLine = await fetchNextComputerMove.fetchNextMove(previousLineMoves);

	// 		dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: nextMoveForLine, currentLineIndex: prevLineIndex } });
	// 	})();

	// 	setPrevLineIndex(gameState.currentLineIndex);

	// }, [gameState.currentLineIndex]);

	return (
		<div onClick={(event) => onClick(event, blockNumber)} className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-[7.5rem] border-x-2 border-b-4 ${getBorderColor(isCurrent, isCorrect!!)}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistory} />
			</div>
		</div>
	);
};

export default MoveBlock;
