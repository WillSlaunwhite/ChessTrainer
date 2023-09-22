import SquarePresentation from "./square-presentation";

interface SquareContainerProps {
	square: string;
	piece: string;
	onMove: (source: string, destination: string) => void;
	selectedSquare: string | null;
	setSelectedSquare: (square: string | null) => void;
}

const SquareContainer: React.FC<SquareContainerProps> = ({ square, piece, onMove, selectedSquare, setSelectedSquare }) => {
	const handleClick = () => {
		if (square === selectedSquare) {
			setSelectedSquare(null);
		} else {
			if(selectedSquare) {
				onMove(selectedSquare, square);
			}
			setSelectedSquare(square);
		}
	};
	const isSelected = square === selectedSquare;

	return <SquarePresentation square={square} piece={piece} selected={isSelected} onClick={handleClick} selectedSquare={selectedSquare}/>;
};

export default SquareContainer;
