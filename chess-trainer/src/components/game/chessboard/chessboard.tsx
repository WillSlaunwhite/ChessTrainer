import { Chess, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useCallback, useEffect, useState } from "react";
import { italianGameMainLine } from "../../../models/constants";
import { useBoard } from "../../../contexts/board-context";
import { useChessboard } from "../../../contexts/chess-context";

interface ChessboardProps {
	chess: Chess;
	darkSquareColor?: string;
	lightSquareColor?: string;
	onMove: (move: string) => void; // Callback when user makes a move
}

const ChessboardComponent: React.FC<ChessboardProps> = ({
	chess,
	darkSquareColor = "#7d5426",
	lightSquareColor = "#e6d9bc",
	onMove,
}) => {
	const [squareStyles, setSquareStyles] = useState({});
	const { selectedSquare, setSelectedSquare } = useChessboard();
	const { fen, setFen } = useBoard();

	console.log("chessboard");

	useEffect(() => {
		chess.load(fen);
		console.log('use effect');
	}, [chess, fen]);

	const handleMove = useCallback(
		(move: { from: string; to: string }) => {
			const { from, to } = move;
			const moves = chess.moves({ square: from as Square, verbose: true });
			console.log("chessboard");

			for (let i = 0; i < moves.length; i++) {
				if (moves[i].to === to) {
					console.log("Before move:", chess.history({ verbose: true }));
					chess.move({ from, to, promotion: "q" });
					console.log("After move:", chess.history({ verbose: true }));


					const newFen = chess.fen();
					if (fen !== newFen) {
						setFen(newFen);
					}


					setSquareStyles({
						[from]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
						[to]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
					});
					console.log(chess.history({ verbose: true }));
					console.log(chess.fen());
					onMove(moves[i].san);
					break;
				}
			}

			if (chess.turn() === "b") {
				setTimeout(() => {
					console.log(chess.history({ verbose: true }));

					const whiteMoveIndex = chess.history.length;
					console.log(whiteMoveIndex);
					const blackMoveSan = italianGameMainLine.blackMoves[whiteMoveIndex];
					console.log(blackMoveSan);
					const possibleMoves = chess.moves({ verbose: true });
					console.log(possibleMoves);

					const blackMove = possibleMoves.find((move) => move.san === blackMoveSan);

					if (blackMove) {
						const blackMoveResult = chess.move(blackMove);
						if (blackMoveResult) {
							console.log(blackMoveResult);

							setFen(chess.fen());
						}
					}
				}, 500);
			}
		},
		[chess, fen, onMove, setFen],
	);

	const handleClick = useCallback(
		(square: string) => {
			console.log("hello");

			if (selectedSquare === null) {
				console.log("hello2");
				setSelectedSquare(square);
			} else {
				console.log("hello3");
				handleMove({ from: selectedSquare, to: square });
				setSelectedSquare(null);
			}
		},
		[handleMove, selectedSquare, setSelectedSquare],
	);

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

const ChessboardComponentMemo = React.memo(ChessboardComponent);
export default ChessboardComponentMemo;
