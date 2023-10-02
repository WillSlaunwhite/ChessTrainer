import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION, SET_NEXT_MOVE } from "../../contexts/game/gameActions";
import { extractMoveDetails } from "../../utility/chessUtils";
import { useHandleComputerMove } from "../../utility/hooks/useHandleComputerMove";
import ChessboardPresentation from "./chessboard-presentation";
import React from "react";

interface ChessboardContainerProps {
	handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void;
	currentLineIndex: number;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleUserMoveUpdate, currentLineIndex }) => {
	const [gameState, dispatch] = useGameState();
	const potentialMoves = useHandleComputerMove();

	const handleMove = (source: string, destination: string) => {
		const computerMove = gameState.nextMoves[currentLineIndex];
		
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
		
		if (computerMove) {
			console.log("COMPUTER MOVE: ", computerMove);
			makeComputerMove(computerMove);
		}

	};

	const makeComputerMove = (move: string) => {
		const [source, destination] = extractMoveDetails(move);
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
	}

	useEffect(() => {
		handleUserMoveUpdate(gameState.san, gameState.moveHistories);
		const nextMovePair = potentialMoves[currentLineIndex];

		if (nextMovePair) {
			const computerMove = extractMoveDetails(nextMovePair.move)[1];
			dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: computerMove, lineIndex: currentLineIndex } });
		}
	}, [gameState.san]);

	useEffect(() => {
		if (gameState.isPawnPromotion) {
			const promotionPiece = window.prompt("Choose a piece (q, r, b, n):") || "q";
			dispatch({
				type: EXECUTE_PAWN_PROMOTION,
				payload: {
					source: gameState.promotionSource,
					destination: gameState.promotionDestination,
					promotion: promotionPiece
				}
			});
		}
	}, [gameState.isPawnPromotion]);

	return <ChessboardPresentation fen={gameState.currentFens[currentLineIndex]} onMove={handleMove} />;
};


export default React.memo(ChessboardContainer);
