import Chessboard from "chessboardjsx";
import { useState } from "react";

type Move = {
	sourceSquare: string;
	targetSquare: string;
	piece: string;
};

interface ChessboardProps {
	initialPosition?: string;
	darkSquareColor?: string;
	lightSquareColor?: string;
	onMove?: (move: Move) => void; // Callback when user makes a move
}

const ChessboardComponent: React.FC<ChessboardProps> = ({
	initialPosition = "start",
	darkSquareColor = "#17203b",
	lightSquareColor = "#4d4d4d",
	onMove,
}) => {
	const [position, setPosition] = useState(initialPosition);

	const handleMove = async (move: Move) => {
		try {
			const response = await fetch("/api/validate-move", {
				method: "POST",
				body: JSON.stringify({ move }),
				headers: {
					"Content-type": "application/json",
				},
			});

			const data = await response.json();
			if (data.valid) {
				setPosition(move);
			} else {
				alert(data.message);
			}

			if (onMove) {
				onMove(move);
			}
		} catch (error) {
			console.error(`Unable to validate move: ${error}`);
		}
	};

	const calcWidth = ({ screenWidth }: { screenWidth: number }) => {
		return screenWidth < 1000 ? screenWidth * 0.9 : screenWidth * 0.4;
	};

	return (
		<div className="chessboard-container mb-20">
			<Chessboard
				calcWidth={calcWidth}
				position={position}
				onDrop={(move: Move) => handleMove(move)}
				darkSquareStyle={{ backgroundColor: darkSquareColor }}
				lightSquareStyle={{ backgroundColor: lightSquareColor }}
				draggable={true}
			/>
		</div>
	);
};

export default ChessboardComponent;
