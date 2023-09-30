import { getBorderColor } from "../../utility/uiUtils";
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

	return (
		<div onClick={(event) => onClick(event, blockNumber)} className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-[7.5rem] border-x-2 border-b-4 ${getBorderColor(isCurrent, isCorrect!!)}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistoriesArray[currentIndex]} />
			</div>
		</div>
	);
};

export default MoveBlock;
