import { useEffect } from "react";
import MoveHistory from "./move-history";

interface MoveProps {
	isCorrect: boolean | null;
	moveHistories: string[][];
	isCurrent: boolean;
	currentIndex: number;
    onClick: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
	blockNumber: number;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistories, isCurrent, currentIndex, onClick, blockNumber }) => {
	const moveHistoriesArray = Object.values(moveHistories);

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

	const convertToFullMoves = (history: string[]) => {
		const fullMoves = [];
		for (let i = 0; i < history.length; i += 2) {
			if (history[i + 1]) {
				fullMoves.push(`${history[i]} ${history[i + 1]}`);
			} else {
				fullMoves.push(history[i]);
			}
		}
		return fullMoves;
	};
	


	useEffect(() => {
		const fetchNextMoves = async () => {
			const allFullMoves = moveHistoriesArray.map(convertToFullMoves);
			const response = await fetch('http://localhost:8085/api/chess/next-moves', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(allFullMoves)
			});

			if (response.ok) {
				const data = await response.json();
				console.log("DATA: ", data, "\t BODY: ", response.body);
			}
		};

		fetchNextMoves()
	}, moveHistoriesArray);

	return (
		<div onClick={(event) => onClick(event, blockNumber)} className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-[7.5rem] border-x-2 border-b-4 ${getBorderColor()}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistoriesArray[currentIndex]} />
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
