import React, { useCallback } from "react";
import MoveBlock from ".";
import { useHandleLineSwitch } from "../../utility/hooks/useHandleLineSwitch";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
}

const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories }) => {
	const switchLines = useHandleLineSwitch();
	const switchLine = useCallback(async (_event: React.MouseEvent<HTMLDivElement>, lineNumber: number) => {
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
					onClick={(event) => switchLine(event, index)}
					blockNumber={index}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
