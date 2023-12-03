import { fetchNextMoveForSequence } from "../../services/apiService";

export function useFetchNextMoveForComputer() {
    const fetchNextMove = async (moveHistory: string[], fen: string) => {
        const nextMove = await fetchNextMoveForSequence(moveHistory, fen);
        return nextMove;
    };

    return {
        fetchNextMove
    };
}