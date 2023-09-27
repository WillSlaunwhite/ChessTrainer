export const ADD_WRONG_MOVE = 'ADD_WRONG_MOVE';
export const DECREMENT_LINE = 'DECREMENT_LINE';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const INCREMENT_MOVE = 'INCREMENT_MOVE';
export const INCREMENT_LINE = 'INCREMENT_LINE';
export const SET_CORRECTNESS = 'SET_CORRECTNESS';
export const SET_CURRENT_LINE_NUMBER = 'SET_CURRENT_LINE_NUMBER';
export const TOGGLE_QUIZ_ACTIVE = 'TOGGLE_QUIZ_ACTIVE';
export const UPDATE_CORRECTNESS = "UPDATE_CORRECTNESS";
export const UPDATE_SCORE = 'UPDATE_SCORE';

interface AddWrongMoveAction {
    type: typeof ADD_WRONG_MOVE;
    payload: { line: number; move: number; };
}

interface DecrementLineAction {
    type: typeof DECREMENT_LINE;
}

interface FinishQuizAction {
    type: typeof FINISH_QUIZ;
}

interface IncrementMoveAction {
    type: typeof INCREMENT_MOVE;
}

interface IncrementLineAction {
    type: typeof INCREMENT_LINE;
}

interface SetCurrentLineNumberAction {
    type: typeof SET_CURRENT_LINE_NUMBER;
    payload: { line: number; }
}

interface SetCorrectnessAction {
    type: typeof SET_CORRECTNESS;
    payload: boolean;
}

interface ToggleQuizAction {
    type: typeof TOGGLE_QUIZ_ACTIVE;
}

interface UpdateScoreAction {
    type: typeof UPDATE_SCORE;
}

interface UpdateCorrectnessAction {
    type: typeof UPDATE_CORRECTNESS;
    payload: {
        isCorrect: boolean[];
    }
}

export type QuizActionTypes = AddWrongMoveAction | DecrementLineAction | FinishQuizAction | IncrementMoveAction | IncrementLineAction | SetCorrectnessAction | SetCurrentLineNumberAction | ToggleQuizAction | UpdateCorrectnessAction | UpdateScoreAction;