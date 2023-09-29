import MoveBlock from "../../components/MoveBlock";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
}


const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories }) => {
	console.log("MOVE CONTAINER MOVE HISTORIES: ", moveHistories);
	const moveHistoriesArray = Object.values(moveHistories);
	// const totalNumMoves = moveHistories.map((history) => { history.map((move) => { ??? })})

	return (
		<div className="block-container flex flex-row w-full h-full justify-center mb-2">
			{moveHistoriesArray.map((moveHistory, i) => (
				<MoveBlock
					key={i}
					moveHistory={moveHistory}
					isCurrent={i === currentBlockIndex}
					isCorrect={isCorrect[i]}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
