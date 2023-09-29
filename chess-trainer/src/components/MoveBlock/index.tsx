import { useEffect } from "react";
import MoveHistory from "./move-history";

interface MoveProps {
	isCorrect: boolean | null;
	moveHistory: string[];
	isCurrent: boolean;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistory, isCurrent }) => {

	const getBorderColor = () => {
		if (isCurrent) {
			return "border-blue-500";
		} else if (isCorrect === false) {
			return "border-red-500";
		} else if (isCorrect === true) {
			return "border-green-500";
		} else {
			return "border-gray-900";
		}
	};


	useEffect(() => {
		const fetchNextMoves = async () => {
			const fullMoves = [];
			for (let i = 0; i < moveHistory.length; i += 2) {
				if (moveHistory[i + 1]) {
					fullMoves.push(`${moveHistory[i]} ${moveHistory[i + 1]}`);
				} else {
					fullMoves.push(moveHistory[i]);
				}
			}
			const response = await fetch('http://localhost:8085/api/chess/next-moves', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([fullMoves])
			});

			if (response.ok) {
				const data = await response.json();
				console.log("DATA: ", data, "\t BODY: ", JSON.stringify([fullMoves]));
			}
		};

		fetchNextMoves()
	}, [moveHistory]);

	return (
		<div className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-36 border-x-2 border-b-4 ${getBorderColor()}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistory} />
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
