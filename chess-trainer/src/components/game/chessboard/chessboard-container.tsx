import { Chess, Square } from "chess.js";
import { useCallback } from "react";
import { useBoard } from "../../../contexts/board-context";
import { useChessboard } from "../../../contexts/chess-context";
import { useHistory } from "../../../contexts/history-context";
import ChessboardPresentation from "./chessboard-presentation";

const game = new Chess();

interface ChessboardContainerProps {
	handleMoveParent: (move: string) => void;
	currentLineIndex: number;
}

const ChessboardContainer: React.FC<ChessboardContainerProps> = ({ handleMoveParent, currentLineIndex }) => {
	const { fen, setFen } = useBoard();
	const { moveHistories, setMoveHistories } = useHistory();
	const { currentFens, setCurrentFens } = useHistory();
	const { setSelectedSquare } = useChessboard();
	console.log("Rendering Chessboard Container with FEN: ", fen);

	game.load(fen);

	const handlePawnPromotion = (source: string, destination: string) => {
		// need to replace with ui component
		const promotionPiece = window.prompt("Choose a piece (q, r, b, n):");

		if (["q", "r", "b", "n"].includes(promotionPiece || "q")) {
			const move = {
				from: source,
				to: destination,
				promotion: promotionPiece || undefined,
			};

			const moveResult = game.move(move);
			if (moveResult && moveResult.san) {
				const updatedHistory = [...moveHistories[currentLineIndex], moveResult.san];
				const updatedHistories = [...moveHistories];
				updatedHistories[currentLineIndex] = updatedHistory;
				setMoveHistories(updatedHistories);
			}

			setFen(game.fen());
			setSelectedSquare(null);
			handleMoveParent(`${move.from}-${move.to}=${promotionPiece}`);
		} else {
			// might want to handle this differently
			alert("Invalid promotion piece.");
		}
	};



	const handleMove = useCallback(
		(source: string, destination: string) => {
			const moves = game.moves({ square: source as Square, verbose: true });

			// check for promotion
			if (game.get(source as Square)?.type === 'p' && (destination[1] === '8' || destination[1] === '1')) {
				handlePawnPromotion(source, destination);
				return;
			}

			// look for move, if found, execute it
			const executedMove = moves.find(m => m.to === destination);
			if (executedMove) {
				game.move(executedMove);

				const updatedHistory = [...moveHistories[currentLineIndex], executedMove.san];
				const updatedHistories = [...moveHistories];
				updatedHistories[currentLineIndex] = updatedHistory;

				setMoveHistories(updatedHistories);
				setFen(game.fen());
				setCurrentFens(prevFens => {
					const updatedFens = [...prevFens];
					updatedFens[currentLineIndex] = game.fen();
					console.log("FENS UPDATED: ", updatedFens);

					return updatedFens;
				});
				setSelectedSquare(null);
				handleMoveParent(executedMove.san);
			}

		},
		[handleMoveParent, moveHistories, setMoveHistories, setFen, setSelectedSquare],
	);


	return <ChessboardPresentation fen={fen} onMove={handleMove} />;
};

export default ChessboardContainer;
