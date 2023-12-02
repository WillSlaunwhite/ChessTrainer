import { fetchNextMoveForSequence } from "../../services/apiService";

export function useFetchNextMoveForComputer() {
    const fetchNextMove = async (moveHistory: string[], fen: string) => {
        console.log(moveHistory);
        console.log(fen);
        const nextMove = await fetchNextMoveForSequence(moveHistory, fen);
        return nextMove;
    };

    return {
        fetchNextMove
    };
}