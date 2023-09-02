import { useState } from "react";
import MoveBlock from "./MoveBlock";

interface Question {
	fen: string;
	correctMove: string;
}

interface MoveContainerProps {
	questions: Question[];
}

const MoveContainer: React.FC<MoveContainerProps> = ({ questions }) => {
	const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

	const handleMove = (move: string) => {
		const correct = move === questions[currentBlockIndex].correctMove;
		if (currentBlockIndex === 2) {
			// TODO update score
			setCurrentBlockIndex(0);
		} else {
			setCurrentBlockIndex(currentBlockIndex + 1);
		}
	};

	return (
		<div className="block-container flex flex-row justify-center mb-2">
			{[0, 1, 2].map((i) => (
				<MoveBlock
					key={i}
					fen={questions[i].fen}
					correctMove={questions[i].correctMove}
					index={i}
					onMove={handleMove}
					moveHistory={["test", "test2"]}
					isCurrent={i===currentBlockIndex}
				/>
			))}
		</div>
	);
};

export default MoveContainer;
