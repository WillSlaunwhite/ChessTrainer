import MoveBlock from "./MoveBlock/move-block";

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
				moveHistory={["test", "test2"]}
			/>
			<MoveBlock
				fen={questions[currentQuestionIndex+1].fen}
				correctMove={questions[currentQuestionIndex+1].correctMove}
				index={currentQuestionIndex+1}
        onMove={handleMove}
				moveHistory={["test3", "test4"]}
			/>
			<MoveBlock
				fen={questions[currentQuestionIndex+2].fen}
				correctMove={questions[currentQuestionIndex+2].correctMove}
				index={currentQuestionIndex+2}
        onMove={handleMove}
				moveHistory={["test5", "test6"]}
			/>
		</div>
	);
};

export default MoveContainer;
