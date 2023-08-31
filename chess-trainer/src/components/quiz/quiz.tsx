import React, { useState } from "react";
import MoveContainer from "./move-container";

interface Question {
	fen: string;
	correctMove: string;
	correctExplanation: string;
	incorrectExplanation: string;
}

interface QuizProps {
	questions: Question[];
}

const QuizComponent: React.FC<QuizProps> = ({ questions }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [score, setScore] = useState(0);
	const [fen, setFen] = useState("");

	return (
		<div>
			<MoveContainer setCurrentQuestionIndex={setCurrentQuestionIndex} currentQuestionIndex={currentQuestionIndex} questions={questions}></MoveContainer>
		</div>
	);
};

export default QuizComponent;
