import { useGameState } from "../../contexts/game/game-context";
import { INCREMENT_LINE, MAKE_MOVE_ALT_FORMAT, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SWITCH_LINES, UPDATE_CURRENT_FENS, UPDATE_MOVE_HISTORIES } from "../../contexts/game/gameActions";

export function useHandleMoveUpdate() {
    return (newMove: string, moveHistories: string[][]) => {
        const [gameState, dispatch] = useGameState();
        const lineIndex = gameState.currentLineIndex;
        const fens = gameState.currentFens;

        // moveHistories[lineIndex].push(newMove);
        // dispatch({ type: UPDATE_MOVE_HISTORIES, payload: { moveHistories: moveHistories } });
        // dispatch({ type: SET_BOARD_FROM_HISTORY });

        // fens[lineIndex] = gameState.fen;
        // dispatch({ type: UPDATE_CURRENT_FENS, payload: { currentFens: fens } });

        // if (gameState.currentLineIndex < 2) {
        //     dispatch({ type: INCREMENT_LINE });
        //     dispatch({ type: SWITCH_LINES, payload: { fen: fens[lineIndex] } });
        // } else {
        //     dispatch({ type: SET_CURRENT_LINE_NUMBER, payload: { lineNumber: 0 } })
        //     dispatch({ type: SWITCH_LINES, payload: { fen: fens[0] } });
        // }

        if (newMove) {
            console.log("makeComputerMove: ", newMove);

            dispatch({ type: MAKE_MOVE_ALT_FORMAT, payload: { move: newMove } });
        }
    }
}