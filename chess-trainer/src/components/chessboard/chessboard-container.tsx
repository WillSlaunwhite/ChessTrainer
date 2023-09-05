import { Chess, Square } from "chess.js";
import { italianGameMainLine } from "../../models/constants";
import { useBoard } from "../GameView/board-context";
import { useChessboard } from "../GameView/chess-context";
import ChessboardPresentation from "./chessboard-presentation";
import { useCallback } from "react";
import { useHistory } from "../GameView/history-context";

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
					const blackMoveSan = italianGameMainLine.black[whiteMoveIndex];
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
