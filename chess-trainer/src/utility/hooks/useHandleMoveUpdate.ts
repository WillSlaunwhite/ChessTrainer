import { Dispatch } from "react";
import { GameState } from "../../contexts/game/game-context";
import { GameActionTypes, INCREMENT_LINE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";

export function useHandleMoveUpdate(
    gameState: GameState,
    gameDispatch: Dispatch<GameActionTypes>,
) {
    return (newMove: string, moveHistories: string[][]) => {
        const updatedMoveHistories = Object.values(moveHistories);
        const lineIndex = gameState.currentLineIndex;
        const fens = gameState.currentFens;
        
        updatedMoveHistories[lineIndex].push(newMove);
        gameDispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: updatedMoveHistories } });
        gameDispatch({ type: SET_BOARD_FROM_HISTORY });

        if (gameState.currentLineIndex < 2) {
            gameDispatch({ type: INCREMENT_LINE });
            gameDispatch({ type: SWITCH_LINES, payload: { fen: fens[lineIndex] } });
        } else {
            gameDispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: 0 } })
            gameDispatch({ type: SWITCH_LINES, payload: { fen: fens[0] } });
        }
    }
}