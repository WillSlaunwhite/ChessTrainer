import { useState } from "react";

interface MoveProps {
	fen: string;
	correctMove: string;
	index: number;
	onMove: (isCorrect: boolean) => void;
}

const MoveBlock: React.FC<MoveProps> = ({ fen, correctMove, index, onMove }) => {
	const [isCurrent, setIsCurrent] = useState(true);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const borderColor = isCorrect === null ? "border-gray-900" : isCorrect ? "border-green-500" : "border-red-500";

	const handleMove = (move: string) => {
		if (move === correctMove) {
			onMove(true);
		} else {
			onMove(false);
		}
	};

	return (
		<div className={`block-border font-sans text-xl text-gray-600 w-[7rem] h-24 mx-1 border-4 ${borderColor}`}>
			<p className="tracking-wide text-center">
				Question {index + 1} <strong>{correctMove}</strong>
			</p>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
