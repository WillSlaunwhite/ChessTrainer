import React from "react";
import MoveBlock from "../../components/MoveBlock";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
    switchLines: (event: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories, switchLines }) => {
	// const totalNumMoves = moveHistories.map((history) => { history.map((move) => { ??? })})
	

	return (
		<div className="block-container flex flex-row w-full h-full justify-center mb-2">
			{[0,1,2].map((index, i) => (
				<MoveBlock
					key={index}
					moveHistory={moveHistories[i]}
					isCurrent={i === currentBlockIndex}
					isCorrect={isCorrect[i]}
					currentIndex={i}
					onClick={(event) => switchLines(event, i)}
					blockNumber={i}
				/>
			))}
		</div>
	);
};

export default React.memo(MoveContainer);
