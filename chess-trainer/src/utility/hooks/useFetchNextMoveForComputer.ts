import { fetchNextMoveForSequence } from "../../services/apiService";
import { convertToFullMoves } from "../chessUtils";

export function useFetchNextMoveForComputer() {

    const fetchNextMove = async (moveHistory: string[]) => {
        const moves = convertToFullMoves(moveHistory);
        const nextMove = await fetchNextMoveForSequence(moves);
        return nextMove;
    };

    return {
        fetchNextMove
    };
}