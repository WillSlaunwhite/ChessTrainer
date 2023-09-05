import { useChessboard } from "../GameView/chess-context";
import SquarePresentation from "./square-presentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string) => void;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove }) => {
	const { selectedSquare, setSelectedSquare } = useChessboard();

	const handleClick = () => {
		if (selectedSquare === null) {
			setSelectedSquare(square);
			if (selectedSquare === square) {
				setSelectedSquare(null);
			}
		} else {
			onMove(selectedSquare, square);
			setSelectedSquare(null);
		}
	};

	const isSelected = square === selectedSquare;

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} />;
};

export default SquareContainer;
