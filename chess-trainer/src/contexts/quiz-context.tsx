import { createContext, useContext, useState } from "react";

interface QuizState {
	currentLine: number;
	currentMoveIndex: number;
	score: number;
	wrongMoves: { line: number; move: number }[];
	isCorrect: boolean[];
	finished: boolean;
}

interface QuizStateProviderProps {
	children: React.ReactNode;
}

const QuizContext = createContext<[QuizState, React.Dispatch<React.SetStateAction<QuizState>>] | undefined>(undefined);

export const useQuiz = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuiz must be used within a QuizProvider");
	}
	return context;
};

export const QuizInteractionProvider: React.FC<QuizStateProviderProps> = ({ children }) => {
	const [quizState, setQuizState] = useState<QuizState>({
		currentLine: 0,
		currentMoveIndex: 0,
		score: 0,
		wrongMoves: [],
		isCorrect: [],
		finished: false,
	});

	return(
		<QuizContext.Provider value={[quizState, setQuizState]}>
			{children}
		</QuizContext.Provider>
	);
};
