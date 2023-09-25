import { createContext, useContext, useReducer } from "react";
import { quizReducer } from "./quizReducer";
import { QuizActionTypes } from "./quizActions";

export interface QuizState {
	currentLineIndex: number;
	currentMoveIndex: number;
	score: number;
	wrongMoves: { line: number; move: number }[];
	isCorrect: boolean[];
	isActive: boolean;
	finished: boolean;
}

interface QuizStateProviderProps {
	children: React.ReactNode;
}

const QuizContext = createContext<[QuizState, React.Dispatch<QuizActionTypes>] | undefined>(undefined);

export const useQuiz = () => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error("useQuiz must be used within a QuizProvider");
	}
	return context;
};

export const QuizInteractionProvider: React.FC<QuizStateProviderProps> = ({ children }) => {
	const [quizState, dispatch] = useReducer(quizReducer, {
		currentLineIndex: 0,
		currentMoveIndex: 0,
		score: 0,
		wrongMoves: [],
		isCorrect: [],
		isActive: false,
		finished: false,
	});

	return (
		<QuizContext.Provider value={[quizState, dispatch]}>
			{children}
		</QuizContext.Provider>
	);
};
