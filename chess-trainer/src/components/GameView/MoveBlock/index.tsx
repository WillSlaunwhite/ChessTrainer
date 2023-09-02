import { useEffect, useState } from "react";

interface MoveProps {
	fen: string;
	correctMove: string;
	index: number;
	onMove: (move: string) => void;
	moveHistory: string[];
	isCurrent: boolean;
}

const MoveBlock: React.FC<MoveProps> = ({ fen, correctMove, index, onMove, moveHistory, isCurrent }) => {
	const [move, setMove] = useState<string | null>(null);

	const borderColor = move === null ? "border-gray-900" : move === correctMove ? "border-green-500" : "border-red-500";

	const handleMove = (move: string) => {
		setMove(move);
		onMove(move);
	};

	useEffect(() => {
		setMove(null);
	}, [isCurrent]);

	return (
		<div className={`block-border font-sans text-xl text-gray-600 w-[7rem] h-24 mx-1 border-4 ${borderColor}`}>
			<div className="move-history tracking-wide text-center">
				{moveHistory.map((move, index) => (
					<p key={index}>{move}</p>
				))}
				<p>{move || "---"}</p>
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
