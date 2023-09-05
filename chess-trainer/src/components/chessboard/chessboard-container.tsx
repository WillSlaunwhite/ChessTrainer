import { Chess, Square } from "chess.js";
import { useBoard } from "../GameView/board-context";
import ChessboardPresentation from "./chessboard-presentation";
import { useChessboard } from "../GameView/chess-context";

const game = new Chess();

const ChessboardContainer: React.FC = () => {
	const { fen, setFen } = useBoard();
	const { setSelectedSquare } = useChessboard();
	game.load(fen);

	const handleMove = (source: string, destination: string) => {
		const move = {
			from: source,
			to: destination,
			promotion: "q",
		};

		const moves = game.moves({ square: source as Square, verbose: true });

		for (let i = 0; i < moves.length; i++) {
			if (moves[i].to === destination) {
				console.log("Before move:", game.history({ verbose: true }));
				game.move(move);
				console.log("After move:", game.history({ verbose: true }));
				setFen(game.fen());
			}
		}
		if (move === null) {
			setSelectedSquare(null);
		}
	};

	return <ChessboardPresentation fen={fen} onMove={handleMove} />;
};

export default ChessboardContainer;
