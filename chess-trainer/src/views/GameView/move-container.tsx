import MoveBlock from "../../components/MoveBlock";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
	moveHistories: string[][];
}


const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex, moveHistories }) => {


	return (
		<div className="block-container flex flex-row justify-center mb-2">
			{moveHistories.map((moveHistory, i) => (
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
