import { Chess, Square } from "chess.js";
import { useCallback } from "react";
import { useBoard } from "../../contexts/board-context";
import { italianGameMainLine } from "../../models/constants";
import ChessboardPresentation from "./chessboard-presentation";
import { useHistory } from "../../contexts/history-context";
import { useChessboard } from "../../contexts/chess-context";

const game = new Chess();

const ChessboardContainer: React.FC = () => {
	const { fen, setFen } = useBoard();
	const { moveHistory, setMoveHistory } = useHistory();
	const { setSelectedSquare } = useChessboard();
	game.load(fen);

	const handleMove = useCallback(
		(source: string, destination: string) => {
			const move = {
				from: source,
				to: destination,
				promotion: "q",
			};

			const moves = game.moves({ square: source as Square, verbose: true });

			for (let i = 0; i < moves.length; i++) {
				if (moves[i].to === destination) {
					game.move(move);

					const newMoveHistory = [...moveHistory];
					newMoveHistory.push(move);
					setMoveHistory(newMoveHistory)

					setFen(game.fen());
					setSelectedSquare(null);
					break;
				}
			}

			if (game.turn() === "b") {
				setTimeout(() => {
					const whiteMoveIndex = moveHistory.length;
					const blackMoveSan = italianGameMainLine.blackMoves[whiteMoveIndex];
					const possibleMoves = game.moves({ verbose: true });

					const blackMove = possibleMoves.find((move) => move.san === blackMoveSan);

					if (blackMove) {
						const blackMoveResult = game.move(blackMove);
						if (blackMoveResult) {
							setFen(game.fen());
						}
					}
				}, 1000);
			}
		},
		[moveHistory, setFen, setMoveHistory, setSelectedSquare],
	);

	return <ChessboardPresentation fen={fen} onMove={handleMove} />;
};

export default ChessboardContainer;
