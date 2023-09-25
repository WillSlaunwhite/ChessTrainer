export const INCREMENT_MOVE = 'INCREMENT_MOVE';
export const INCREMENT_LINE = 'INCREMENT_LINE';
export const DECREMENT_LINE = 'DECREMENT_LINE';
export const SET_CURRENT_LINE_NUMBER = 'SET_CURRENT_LINE_NUMBER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const ADD_WRONG_MOVE = 'ADD_WRONG_MOVE';
export const SET_CORRECTNESS = 'SET_CORRECTNESS';
export const TOGGLE_QUIZ_ACTIVE = 'TOGGLE_QUIZ_ACTIVE';
export const FINISH_QUIZ = 'FINISH_QUIZ';

interface IncrementMoveAction {
    type: typeof INCREMENT_MOVE;
}

interface IncrementLineAction {
    type: typeof INCREMENT_LINE;
}

interface DecrementLineAction {
    type: typeof DECREMENT_LINE;
}

interface SetCurrentLineNumberAction {
    type: typeof SET_CURRENT_LINE_NUMBER;
    payload: { line: number; }
}

interface UpdateScoreAction {
    type: typeof UPDATE_SCORE;
}

interface AddWrongMoveAction {
    type: typeof ADD_WRONG_MOVE;
    payload: { line: number; move: number; };
}

interface SetCorrectnessAction {
    type: typeof SET_CORRECTNESS;
    payload: boolean;
}

interface ToggleQuizAction {
    type: typeof TOGGLE_QUIZ_ACTIVE;
}

interface FinishQuizAction {
    type: typeof FINISH_QUIZ;
}

export type QuizActionTypes = IncrementMoveAction | IncrementLineAction | UpdateScoreAction | AddWrongMoveAction | SetCorrectnessAction | ToggleQuizAction | FinishQuizAction | DecrementLineAction | SetCurrentLineNumberAction;