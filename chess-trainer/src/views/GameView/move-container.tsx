import MoveBlock from "../../components/common/MoveBlock";
import { useHistory } from "../../contexts/history-context";


interface MoveContainerProps {
	isCorrect: boolean[];
	currentBlockIndex: number;
}


const MoveContainer: React.FC<MoveContainerProps> = ({ isCorrect, currentBlockIndex }) => {
	// const [currentColor, setCurrentColor] = useState<'white' | 'black'>('white')
	const { moveHistories } = useHistory();


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
