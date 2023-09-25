import { useEffect } from "react";
import MoveHistory from "./move-history";

interface MoveProps {
	isCorrect: boolean | null;
	moveHistory: string[];
	isCurrent: boolean;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistory, isCurrent }) => {

	const getBorderColor = () => {
		if (isCorrect === null && isCurrent) {
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
			console.log("MOVE HISTORY: ", moveHistory);
			
			const response = await fetch('http://localhost:8085/api/chess/next-moves', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([moveHistory])
			});

			// if (response.ok) {
				const data = await response.json();
				console.log("DATA: ", data);
			// }
		};

		fetchNextMoves()
	}, [moveHistory]);

	return (
		<div className={`block-border font-sans text-xl text-gray-600 w-[7rem] overflow-scroll h-24 mx-1 border-4 ${getBorderColor()}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistory} />
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
