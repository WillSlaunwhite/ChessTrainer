import { useGameState } from "../../store/game/contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, SET_HIGHLIGHT_SQUARES, SWITCH_LINE } from "../../store/game/types/actionTypes";
import { getLastMoveSquares } from "../chessUtils";

export function useHandleLineSwitch() {
    const [gameState, dispatch] = useGameState();

    const handleLineSwitch = (lineIndex: number) => {
        const line = gameState.lines[lineIndex];
        const lastMoveSan = line.moveHistory.slice(-1)[0];

        if (lastMoveSan) {
            const lastMoves = getLastMoveSquares(line.moveHistory);
            if (lastMoves) {
                dispatch({ type: SWITCH_LINE, payload: { lineIndex: lineIndex } });
                dispatch({ type: CLEAR_SELECTED_SQUARES });
                dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { from: lastMoves.from, to: lastMoves.to } })
            }
        }
    }

    return {
        handleLineSwitch
    }
}