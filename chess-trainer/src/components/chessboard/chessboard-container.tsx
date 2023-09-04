import { Chess } from "chess.js";
import { useBoard } from "../GameView/board-context";
import ChessboardPresentation from "./chessboard-presentation";

const game = new Chess();

const ChessboardContainer: React.FC = () => {
	const { fen, setFen } = useBoard();

	const handleMove = (source: string, destination: string) => {
		const move = game.move({
			from: source,
			to: destination,
			promotion: "q",
		});

		if (move) setFen(game.fen());
	};

	return <ChessboardPresentation fen={fen} onMove={handleMove} />;
};

export default ChessboardContainer;
