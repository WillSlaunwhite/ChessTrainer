import { useGameState } from "../../contexts/game/game-context";
import { GET_PIECE_AT_SQUARE, MAKE_MOVE, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	// handleMoveParent: (source: string, destination: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = () => {
	const [gameState, gameDispatch] = useGameState();

	const handleMove = (source: string, destination: string) => {
		gameDispatch({
			type: GET_PIECE_AT_SQUARE,
			payload: {
				square: source
			}
		});
		const pieceAtSource = gameState.pieceAtSquare;

		// check for promotion
		if (pieceAtSource === 'p' && (destination[1] === '8' || destination[1] === '1')) {
			const promotionPiece = window.prompt("Choose a piece (q, r, b, n):") || "q";
			gameDispatch({
				type: MAKE_MOVE_WITH_PROMOTION,
				payload: {
					source,
					destination,
					promotionPiece,
				}
			});
		} else {
			gameDispatch({
				type: MAKE_MOVE,
				payload: {
					source,
					destination,
				}
			});
		}
		gameDispatch({type: SELECT_SQUARE, payload: { square: null}});

		// handleMoveParent(source, destination);
	};

	return <ChessboardPresentation fen={gameState.fen} onMove={handleMove} />;
};

export default ChessboardContainer;
