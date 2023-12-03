import { fetchEvaluation } from "../../services/apiService";


export function useFetchNextMoveForComputer() {
    const fetchPositionEvaluation = async (fen: string, move: string) => {
        const evaluation = await fetchEvaluation(fen, move);
        return evaluation;
    };

    return {
        fetchPositionEvaluation
    };
}