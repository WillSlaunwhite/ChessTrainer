import { useGameState } from "../../store/game/contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, HIGHLIGHT_LAST_MOVES, SET_HIGHLIGHT_SQUARES, UNDO_MOVE } from "../../store/game/types/actionTypes";
import { convertToHalfMoves, getLastMoveSquares } from "../chessUtils";

export function useUndoMove() {
    const [_gameState, dispatch] = useGameState();

    const handleUndoMove = (moveHistory: string[]) => {
        const newMoveHistory = convertToHalfMoves(moveHistory).slice(0, -1);
        dispatch({ type: UNDO_MOVE, payload: { moveHistory: newMoveHistory } });
        dispatch({ type: CLEAR_SELECTED_SQUARES})
        dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: [getLastMoveSquares(newMoveHistory).from, getLastMoveSquares(newMoveHistory).to] } })
    }

    return {
        handleUndoMove
    }
}