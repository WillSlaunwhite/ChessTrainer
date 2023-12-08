import { useGameState } from "../../store/game/contexts/GameContext";
import { RESET_TIMER, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES } from "../../store/game/types/actionTypes";
import { getPossibleMovesForSquare, isValidMove } from "../chessUtils";
import { useUserMoveLogic } from "./useUserMoveLogic";

export function useHandleSquareClickLogic() {
    const userMove = useUserMoveLogic();
    const [gameState, dispatch] = useGameState();
    const fen = gameState.lines[gameState.global.currentLineIndex].fen;
    const selectedSquare = gameState.global.selectedSquare;
    const highlightedSquares = gameState.global.highlightedSquares;

    const handleSquareClick = (piece: string, square: string) => {
        const possibleMoves = getPossibleMovesForSquare(fen, square);
        const isValid = isValidMove(fen, selectedSquare, square);

        if (piece && !selectedSquare) {
            dispatch({ type: SELECT_SQUARE, payload: { square: square } });
            dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: possibleMoves } });
        } else if (selectedSquare && isValid) {
            userMove.handleMove(selectedSquare, square, fen);
        } else if (selectedSquare === square && highlightedSquares.length > 2) {
            dispatch({ type: SELECT_SQUARE, payload: { square: square } });
            dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: possibleMoves } });
        } else {
            if (piece || selectedSquare) {
                dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: possibleMoves } });
            }
            dispatch({ type: SELECT_SQUARE, payload: { square: "" } });
        }
    };

    return {
        handleSquareClick
    }
}