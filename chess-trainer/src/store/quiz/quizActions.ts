export const ADD_WRONG_MOVE = 'ADD_WRONG_MOVE';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const SET_CORRECTNESS = 'SET_CORRECTNESS';
export const TOGGLE_QUIZ_ACTIVE = 'TOGGLE_QUIZ_ACTIVE';
export const UPDATE_CORRECTNESS = "UPDATE_CORRECTNESS";
export const UPDATE_SCORE = 'UPDATE_SCORE';

interface AddWrongMoveAction {
    type: typeof ADD_WRONG_MOVE;
    payload: { line: number; move: number; };
}

interface FinishQuizAction {
    type: typeof FINISH_QUIZ;
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

export type QuizActionTypes = AddWrongMoveAction | FinishQuizAction |  SetCorrectnessAction | ToggleQuizAction | UpdateCorrectnessAction | UpdateScoreAction;