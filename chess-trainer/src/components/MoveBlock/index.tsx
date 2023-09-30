import { useEffect } from "react";
import MoveHistory from "./move-history";
import { convertToFullMoves, getBorderColor } from "../../utility/functions";

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
		<div onClick={(event) => onClick(event, blockNumber)} className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-[7.5rem] border-x-2 border-b-4 ${getBorderColor(isCurrent, isCorrect!!)}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistoriesArray[currentIndex]} />
			</div>
		</div>
		// move numbers and the move next to it
		// border turns green on success, red on failure
	);
};

export default MoveBlock;
