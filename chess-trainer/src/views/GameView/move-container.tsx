import MoveBlock from "../../components/common/MoveBlock";


interface MoveContainerProps {
	isCorrect: boolean[];
	moveHistories: string[][];
	currentBlockIndex: number;
}

const MoveContainer: React.FC<MoveContainerProps> = ({isCorrect, moveHistories, currentBlockIndex}) => {
	return (
		<div className="block-container flex flex-row justify-center mb-2">
			{[0, 1, 2].map((i) => (
				<MoveBlock
					key={i}
					moveHistory={moveHistories[i]}
					isCurrent={i === currentBlockIndex}
					isCorrect={isCorrect[i]}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
