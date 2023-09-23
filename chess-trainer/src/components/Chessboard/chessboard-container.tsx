import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { GET_PIECE_AT_SQUARE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_WITH_PROMOTION } from "../../contexts/game/gameActions";
import { useQuiz } from "../../contexts/quiz/quiz-context";
import ChessboardPresentation from "./chessboard-presentation";

interface ChessboardContainerProps {
	handleMoveParent: (source: string, destination: string) => void;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleMoveParent }) => {
	const [gameState, gameDispatch] = useGameState();
	const [quizState] = useQuiz();

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
			const promotionPiece = window.prompt("Choose a piece (q, r, b, n):") || undefined;
			gameDispatch({
				type: MAKE_MOVE_WITH_PROMOTION,
				payload: {
					source,
					destination,
					promotionPiece,
					currentLineIndex: quizState.currentLineIndex
				}
			});
		} else {
			gameDispatch({
				type: MAKE_MOVE,
				payload: {
					source,
					destination,
					currentLineIndex: quizState.currentLineIndex
				}
			});
		}

		handleMoveParent(source, destination);
	};

	useEffect(() => {
		gameDispatch({ type: INIT_GAME, payload: { fen: gameState.fen } });
	}, [gameState.fen, gameDispatch]);

	return <ChessboardPresentation fen={gameState.fen} onMove={handleMove} />;
};

export default ChessboardContainer;
