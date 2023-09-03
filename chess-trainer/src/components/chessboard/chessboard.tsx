import { Chess, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import { useEffect, useRef, useState } from "react";
import { italianGameLines, italianGameMainLine } from "../../models/constants";

interface ChessboardProps {
	fen: string;
	setFen: (fen: string) => void;
	darkSquareColor?: string;
	lightSquareColor?: string;
	onMove: (move: string) => void; // Callback when user makes a move
}

const ChessboardComponent: React.FC<ChessboardProps> = ({
	fen,
	setFen,
	darkSquareColor = "#7d5426",
	lightSquareColor = "#e6d9bc",
	onMove,
}) => {
	const chess = useRef(new Chess());
	const [squareStyles, setSquareStyles] = useState({});
	const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
	const [moveIndex, setMoveIndex] = useState(0);


	useEffect(() => {
		chess.current.load(fen);
	}, [fen]);

	const handleClick = (square: string) => {
		if (selectedSquare === null) {
			setSelectedSquare(square);
			setSquareStyles({
				[square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
			});
		} else {
			handleMove({ from: selectedSquare, to: square });
			setSelectedSquare(null);
			setSquareStyles({});
		}
	};

	const handleMove = (move: { from: string; to: string }) => {
		const { from, to } = move;
		const moves = chess.current.moves({ square: from as Square, verbose: true });

		const newChessInstance = new Chess();
		newChessInstance.load(chess.current.fen());

		for (let i = 0; i < moves.length; i++) {
			if (moves[i].to === to) {
				if (newChessInstance.move({ from, to, promotion: "q" })) {
					console.log("New instance history:", newChessInstance.history({ verbose: true }));
				}

				// console.log("Before move:", chess.current.history({ verbose: true }));
				// chess.current.move({ from, to, promotion: "q" });
				// console.log("After move:", chess.current.history({ verbose: true }));
				setFen(newChessInstance.fen());
				setSquareStyles({
					[from]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
					[to]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
				});
				console.log(newChessInstance.history({ verbose: true }));
				console.log(newChessInstance.fen());
				onMove(moves[i].san);
				break;
			}
		}

		if (newChessInstance.turn() === "b") {
			setTimeout(() => {
				console.log(newChessInstance.history({ verbose: true }));

				const whiteMoveIndex = moveIndex;
				console.log(whiteMoveIndex);
				const blackMoveSan = italianGameMainLine.black[whiteMoveIndex];
				console.log(blackMoveSan);
				const possibleMoves = newChessInstance.moves({ verbose: true });
				console.log(possibleMoves);

				const blackMove = possibleMoves.find((move) => move.san === blackMoveSan);

				if (blackMove) {
					const blackMoveResult = newChessInstance.move(blackMove);
					if (blackMoveResult) {
						console.log(blackMoveResult);
						setFen(newChessInstance.fen());
					}
					setMoveIndex(prevIndex => prevIndex + 1);
				}
			}, 500);
		}
	};

	const calcWidth = ({ screenWidth }: { screenWidth: number }) => {
		if (screenWidth < 500) {
			return screenWidth * 0.9;
		} else if (screenWidth < 750) {
			return screenWidth * 0.7;
		} else if (screenWidth < 900) {
			return screenWidth * 0.6;
		} else {
			return screenWidth * 0.5;
		}
	};

	return (
		<div className="chessboard w-auto h-auto flex items-center justify-center z-30">
			<Chessboard
				squareStyles={squareStyles}
				darkSquareStyle={{ backgroundColor: darkSquareColor }}
				lightSquareStyle={{ backgroundColor: lightSquareColor }}
				calcWidth={calcWidth}
				position={fen}
				onDrop={(move: { sourceSquare: string; targetSquare: string }) =>
					handleMove({ from: move.sourceSquare, to: move.targetSquare })
				}
				onSquareClick={handleClick}
				draggable={true}
			/>
		</div>
	);
};

export default ChessboardComponent;
