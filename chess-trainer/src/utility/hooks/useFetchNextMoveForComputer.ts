import { fetchNextMoveForSequence } from "../../services/apiService";
import { GameActionTypes } from "../../store/game/actions/gameActions";
import { SET_NEXT_MOVE } from "../../store/game/types/actionTypes";

export function useFetchNextMoveForComputer(dispatch: React.Dispatch<GameActionTypes>) {
    const fetchNextMove = async (moveHistory: string[], fen: string, lineIndex: number) => {
        const nextMove = await fetchNextMoveForSequence(moveHistory, fen);
        if (nextMove) {
            dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: nextMove, currentLineIndex: lineIndex } });
        }
        return nextMove;
    };

    return {
        fetchNextMove
    };
}