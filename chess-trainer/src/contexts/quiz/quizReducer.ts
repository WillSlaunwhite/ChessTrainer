import { QuizState } from "./quiz-context";
import { ADD_WRONG_MOVE, DECREMENT_LINE, FINISH_QUIZ, INCREMENT_LINE, INCREMENT_MOVE, QuizActionTypes, SET_CORRECTNESS, SET_CURRENT_LINE_NUMBER, TOGGLE_QUIZ_ACTIVE, UPDATE_SCORE } from "./quizActions";

export const quizReducer = (state: QuizState, action: QuizActionTypes): QuizState => {
    switch (action.type) {
        case INCREMENT_MOVE:
            return { ...state, currentMoveIndex: state.currentMoveIndex + 1 };

        case INCREMENT_LINE:
            return { ...state, currentLineIndex: state.currentLineIndex + 1 };

        case DECREMENT_LINE:
            return { ...state, currentLineIndex: state.currentLineIndex - 1 };

        case SET_CURRENT_LINE_NUMBER:
            return { ...state, currentLineIndex: action.payload.line }

        case UPDATE_SCORE:
            return { ...state, score: state.score + 1 };

        case ADD_WRONG_MOVE:
            return { ...state, wrongMoves: [...state.wrongMoves, action.payload] };

        case SET_CORRECTNESS:
            return { ...state, isCorrect: [...state.isCorrect, action.payload] };

        case TOGGLE_QUIZ_ACTIVE:
            return { ...state, isActive: !state.isActive };

        case FINISH_QUIZ:
            return { ...state, finished: true };

        default:
            return state;
    }
};