import { fetchNextMoveForSequence } from "../../services/apiService";
import { convertToFullMoves } from "../chessUtils";

export function useFetchNextMoveForComputer() {

    const fetchNextMove = async (moveHistory: string[]) => {
        console.log(moveHistory);
        const nextMove = await fetchNextMoveForSequence(moveHistory);
        return nextMove;
    };

    return {
        fetchNextMove
    };
}