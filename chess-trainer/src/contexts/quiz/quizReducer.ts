import { QuizState } from "./quiz-context";
import { ADD_WRONG_MOVE, FINISH_QUIZ, QuizActionTypes, SET_CORRECTNESS, TOGGLE_QUIZ_ACTIVE, UPDATE_CORRECTNESS, UPDATE_SCORE } from "./quizActions";

export const quizReducer = (state: QuizState, action: QuizActionTypes): QuizState => {
    switch (action.type) {
        case ADD_WRONG_MOVE:
            return { ...state, wrongMoves: [...state.wrongMoves, action.payload] };

        case FINISH_QUIZ:
            return { ...state, finished: true };

        case SET_CORRECTNESS:
            return { ...state, isCorrect: [...state.isCorrect, action.payload] };

        case TOGGLE_QUIZ_ACTIVE:
            return { ...state, isActive: !state.isActive };

        case UPDATE_CORRECTNESS:
            return { ...state, isCorrect: action.payload.isCorrect }

        case UPDATE_SCORE:
            return { ...state, score: state.score + 1 };

        default:
            return state;
    }
};