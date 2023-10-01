import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION } from "../../contexts/game/gameActions";
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
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
	};

	const makeComputerMove = (move: string) => {
		const [source, destination] = extractMoveDetails(move);
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } })
	}

	useEffect(() => {
		handleUserMoveUpdate(gameState.san, gameState.moveHistories);

		// after user moves, computer responsds
		const movePair = potentialMoves[currentLineIndex];
		if (movePair) {
			console.log("COMPUTER MOVE: ", extractMoveDetails(movePair.move)[1]);
			const computerMove = extractMoveDetails(movePair.move);
			makeComputerMove(computerMove[1]);
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
