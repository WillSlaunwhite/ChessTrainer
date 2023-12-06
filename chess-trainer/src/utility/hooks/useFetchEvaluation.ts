import { fetchEvaluation } from "../../services/apiService";


export function useFetchEvaluation() {
    const fetchPositionEvaluation = async (fen: string, move: string) => {
        console.log(`${move} - ${fen}`);
        const { bestMove, centipawns, principalVariation } = await fetchEvaluation(fen, move);
        return { bestMove, centipawns, principalVariation };
    };

    return {
        fetchPositionEvaluation
    };
}