import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION } from "../../contexts/game/gameActions";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	// handleMoveParent: (source: string, destination: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = () => {
	const [gameState, dispatch] = useGameState();

	const handleMove = (source: string, destination: string) => {
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
	};

	console.log("************** INITIAL MOVES FROM CHESSBOARD: ", gameState.initialMoves);
	

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

	return <ChessboardPresentation fen={gameState.fen} onMove={handleMove} />;
};


export default ChessboardContainer;
