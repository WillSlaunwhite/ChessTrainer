import MoveBlock from "./move-block";

interface Question {
	fen: string;
	correctMove: string;
}

interface MoveContainerProps {
	currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
	questions: Question[];
}

const MoveContainer: React.FC<MoveContainerProps> = ({ currentQuestionIndex, setCurrentQuestionIndex, questions }) => {
  const handleMove = (isCorrect: boolean) => {
    if (isCorrect) { }
      // if move is correct
  }


	return (
		<div className="block-container flex flex-row justify-center mb-2">
			<MoveBlock
				fen={questions[currentQuestionIndex].fen}
				correctMove={questions[currentQuestionIndex].correctMove}
				index={currentQuestionIndex}
        onMove={handleMove}
			/>
			<MoveBlock
				fen={questions[currentQuestionIndex+1].fen}
				correctMove={questions[currentQuestionIndex+1].correctMove}
				index={currentQuestionIndex+1}
        onMove={handleMove}
			/>
			<MoveBlock
				fen={questions[currentQuestionIndex+2].fen}
				correctMove={questions[currentQuestionIndex+2].correctMove}
				index={currentQuestionIndex+2}
        onMove={handleMove}
			/>
		</div>
	);
};

export default MoveContainer;
