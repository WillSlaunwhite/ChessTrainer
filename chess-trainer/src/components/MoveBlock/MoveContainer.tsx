import React from "react";
import MoveBlock from ".";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
    switchLines: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories, switchLines }) => {
	return (
		<div className="block-container flex flex-row w-full h-full justify-center mb-2">
			{[0,1,2].map((index) => (
				<MoveBlock
					key={index}
					moveHistory={moveHistories[index]}
					isCurrent={index === currentBlockIndex}
					isCorrect={isCorrect[index]}
					currentIndex={index}
					onClick={(event) => switchLines(event, index)}
					blockNumber={index}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
