import { useGameState } from "../../store/game/contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, UNDO_MOVE } from "../../store/game/types/actionTypes";
import { convertToHalfMoves, getLastMoveSquares } from "../chessUtils";

export function useUndoMove() {
    const [_gameState, dispatch] = useGameState();

    const handleUndoMove = (moveHistory: string[]) => {
        const newMoveHistory = convertToHalfMoves(moveHistory).slice(0, -1);

        dispatch({ type: UNDO_MOVE, payload: { moveHistory: newMoveHistory } });
        dispatch({ type: CLEAR_SELECTED_SQUARES });

        if (newMoveHistory.length > 0) {
            const { from, to } = getLastMoveSquares(newMoveHistory);
            dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: [from, to] } });
            dispatch({ type: SELECT_SQUARE, payload: { square: to } });
        } else {
            dispatch({ type: SELECT_SQUARE, payload: { square: "" } });
        }
    }

    return {
        handleUndoMove
    }
}