import React, { useCallback } from "react";
import MoveBlock from ".";
import { useHandleLineSwitch } from "../../utility/hooks/useHandleLineSwitch";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
	activeLines: boolean[];
}

const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories, activeLines }) => {
	const switchLines = useHandleLineSwitch();
	const switchLine = useCallback(async (lineNumber: number) => {
		switchLines.handleLineSwitch(lineNumber);
	}, []);

	return (
		<div className="block-container flex flex-row w-full h-full justify-center mb-2">
			{[0, 1, 2].map((index) => (
				<MoveBlock
					key={index}
					moveHistory={moveHistories[index]}
					isCurrent={index === currentBlockIndex}
					isCorrect={isCorrect[index]}
					currentIndex={index}
					onClick={() => switchLine(index)}
					blockNumber={index}
					isActive={activeLines[index]}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
