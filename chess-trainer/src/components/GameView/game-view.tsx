import GameContainerComponent from "./game-container";
import QuizComponent from "./quiz";

interface Question {
	fen: string;
	correctMove: string;
	correctExplanation: string;
	incorrectExplanation: string;
}

const GameView: React.FC<{ fen: string; setFen: (fen: string) => void; questions: Question[] }> = ({ fen, setFen, questions }) => {
	const handleMove = (move: string) => {
		// do something with move
	};
	
	return (
		<div className=" bg-blue-gray-50 flex flex-col justify-center items-center h-full w-full overflow-hidden">
			<div className="quiz-container w-full ">
				<QuizComponent questions={questions}></QuizComponent>
			</div>
			<div className="game-container w-full h-3/4 self-end flex items-end justify-center">
				<GameContainerComponent fen={fen} setFen={setFen} onMove={handleMove} />
			</div>
		</div>
	);
};

export default GameView;
