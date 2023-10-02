import { Dispatch } from "react";
import { GameState } from "../../contexts/game/game-context";
import { GameActionTypes, INCREMENT_LINE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";

export function useHandleMoveUpdate(
    gameState: GameState,
    gameDispatch: Dispatch<GameActionTypes>,
) {
    return (newMove: string, moveHistories: string[][]) => {

        const updatedMoveHistories = Object.values(moveHistories);
        updatedMoveHistories[gameState.currentLineIndex].push(newMove);

        gameDispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: updatedMoveHistories } });
        gameDispatch({ type: SET_BOARD_FROM_HISTORY, payload: { moveHistory: updatedMoveHistories[gameState.currentLineIndex], lineIndex: gameState.currentLineIndex } });

        if (gameState.currentLineIndex < 2) {
            gameDispatch({ type: INCREMENT_LINE });
            // gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: gameState.currentLineIndex + 1 } })
            gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[gameState.currentLineIndex + 1] } });
        }
        else {
            gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: 0 } })
            gameDispatch({ type: SWITCH_LINES, payload: { fen: gameState.currentFens[0] } });
        }
    }
}