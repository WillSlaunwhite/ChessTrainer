import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION } from "../../contexts/game/gameActions";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	handleMoveParent: (newMove: string, moveHistories: string[][]) => void;
	currentLineIndex: number;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleMoveParent, currentLineIndex }) => {
	const [gameState, dispatch] = useGameState();

	const handleMove = (source: string, destination: string) => {
		dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
	};

	useEffect(() => {
		handleMoveParent(gameState.san, gameState.moveHistories);
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


export default ChessboardContainer;
