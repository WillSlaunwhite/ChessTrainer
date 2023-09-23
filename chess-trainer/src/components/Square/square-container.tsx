import { useGameState } from "../../contexts/game/game-context";
import { SELECT_SQUARE } from "../../contexts/game/gameActions";
import SquarePresentation from "./square-presentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string) => void;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove }) => {
	const [gameState, dispatch] = useGameState();
	const selectedSquare = gameState.selectedSquare;

	const handleClick = () => {
		if (square === selectedSquare) {
			dispatch({ type: SELECT_SQUARE, payload: { square: null } })
		} else {
			if (selectedSquare) {
				onMove(selectedSquare, square);
				return;
			}
			dispatch({ type: SELECT_SQUARE, payload: { square: square } })
		}
	};
	const isSelected = square === selectedSquare;

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} selectedSquare={selectedSquare} />;
};

export default SquareContainer;
