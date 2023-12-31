import React from "react";
import { getBorderColor } from "../../utility/uiUtils";
import MoveHistory from "./MoveHistory";

interface MoveProps {
	isCorrect: boolean;
	moveHistory: string[];
	isCurrent: boolean;
	currentIndex: number;
	onClick: (index: number) => void;
	blockNumber: number;
	isActive: boolean;
}

const MoveBlock: React.FC<MoveProps> = ({ isCorrect, moveHistory, isCurrent, onClick, blockNumber, isActive }) => {
	const notActive = !isActive ? "border-gray-400" : "";
	console.log(notActive);
	
	return (
		<div onClick={() => onClick(blockNumber)} className={`block-border font-sans text-xl shadow-2xl text-gray-600 w-full m-0 overflow-scroll h-[7.5rem] border-x-2 border-b-4 ${getBorderColor(isCurrent, isCorrect, isActive)}`}>
			<div className="move-history tracking-wide text-center">
				<MoveHistory moveHistory={moveHistory} isActive={isActive} />
			</div>
		</div>
	);
};

export default MoveBlock;
