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
	darkSquareColor = "#7d5426",
	lightSquareColor = "#e6d9bc",
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
				setPosition(data.position);
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
		if (screenWidth < 500) {
			return screenWidth * 0.9;
		} else if (screenWidth < 750) {
			return screenWidth * 0.7;
		} else {
			return screenWidth * 0.5;
		}
	};

	return (
		<div className="chessboard-container w-screen h-4/5 flex items-start justify-center">
			<Chessboard
				darkSquareStyle={{ backgroundColor: darkSquareColor }}
				lightSquareStyle={{ backgroundColor: lightSquareColor }}
				calcWidth={calcWidth}
				position={position}
				onDrop={(move: Move) => handleMove(move)}
				draggable={true}
			/>
		</div>
	);
};

export default ChessboardComponent;
