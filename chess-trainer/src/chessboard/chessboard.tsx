import Chessboard from "chessboardjsx";
import { useState } from "react";

interface ChessboardProps {
	initialPosition?: string;
	darkSquareColor?: string;
	lightSquareColor?: string;
	onMove?: (move: string) => void; // Callback when user makes a move
}

const ChessboardComponent: React.FC<ChessboardProps> = ({
	initialPosition = "start",
	darkSquareColor = "#17203b",
	lightSquareColor = "#4d4d4d",
  pieceTheme = "chess24_theme",
	onMove,
}) => {
	const [position, setPosition] = useState(initialPosition);
	const [hint, setHint] = useState<string | null>(null);

	const handleMove = async (move: any) => {
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
	};

	const showHint = () => {
		// need to add logic to show hints to users, when enabled
		setHint("e4");
	};

	return (
		<div className="chessboard-container">
			<Chessboard
				position={position}
				onDrop={(move: any) => handleMove(move)}
				darkSquareStyle={{ backgroundColor: darkSquareColor }}
        lightSquareStyle={{ backgroundColor: lightSquareColor }}
				draggable={true}
			/>
			<button className="test-button" onClick={showHint}>Hint</button>
			{hint && <div className="hint">Try moving: {hint}</div>}
		</div>
	);
};

export default ChessboardComponent;
