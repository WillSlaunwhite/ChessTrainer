import { useGameState } from "../../store/game/contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, SWITCH_LINE } from "../../store/game/types/actionTypes";
import { getLastMoveSquares } from "../chessUtils";

export function useHandleLineSwitch() {
    const [gameState, dispatch] = useGameState();

    const handleLineSwitch = (lineIndex: number) => {
        const line = gameState.lines[lineIndex];

        const lastMoves = getLastMoveSquares(line.moveHistory);
        console.log(lastMoves);

        if (lastMoves) {
            dispatch({ type: SWITCH_LINE, payload: { lineIndex: lineIndex } });
            dispatch({ type: CLEAR_SELECTED_SQUARES })
            dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: [lastMoves.from, lastMoves.to] } })
            dispatch({ type: SELECT_SQUARE, payload: { square: "" } })
        }
    }

    return {
        handleLineSwitch
    }
}