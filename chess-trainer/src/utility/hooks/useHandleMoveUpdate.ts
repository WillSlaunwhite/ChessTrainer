import { Dispatch } from "react";
import { GameState } from "../../contexts/game/game-context";
import { GameActionTypes, SET_BOARD_FROM_HISTORY, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";
import { QuizState } from "../../contexts/quiz/quiz-context";
import { INCREMENT_LINE, INCREMENT_MOVE, QuizActionTypes, SET_CURRENT_LINE_NUMBER } from "../../contexts/quiz/quizActions";

export function useHandleMoveUpdate(
    gameState: GameState,
    quizState: QuizState,
    gameDispatch: Dispatch<GameActionTypes>,
    quizDispatch: Dispatch<QuizActionTypes>
) {
    return (newMove: string, moveHistories: string[][]) => {

        const updatedMoveHistories = Object.values(moveHistories);
        updatedMoveHistories[quizState.currentLineIndex].push(newMove);

        gameDispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: updatedMoveHistories } });
        gameDispatch({ type: SET_BOARD_FROM_HISTORY, payload: { moveHistory: updatedMoveHistories[quizState.currentLineIndex], lineIndex: quizState.currentLineIndex } });

        quizDispatch({ type: INCREMENT_MOVE });

        if (quizState.currentLineIndex < 2) {
            quizDispatch({ type: INCREMENT_LINE });
            gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[quizState.currentLineIndex + 1] } });
        }
        else {
            quizDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { line: 0 } })
            gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[0] } });
        }
    }
}