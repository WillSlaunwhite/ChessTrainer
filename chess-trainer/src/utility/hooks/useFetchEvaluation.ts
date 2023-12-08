import { fetchEvaluation } from "../../services/apiService";
import { useGameState } from "../../store/game/contexts/GameContext";
import { UPDATE_EVALUATION } from "../../store/game/types/actionTypes";


export function useFetchEvaluation() {
    const [gameState, dispatch] = useGameState();
    
    const fetchPositionEvaluation = async (fen: string, move: string) => {
        console.log(`${move} - ${fen}`);
        const { bestMove, centipawns, principalVariation } = await fetchEvaluation(fen, move);
        const turn = fen.split(" ")[1];
        const adjustedCentipawns = turn === 'b' ? -centipawns : centipawns;
        dispatch({ type: UPDATE_EVALUATION, payload: { lineIndex: gameState.global.currentLineIndex, evaluation: adjustedCentipawns } });
        return { bestMove, adjustedCentipawns, principalVariation };
    };

    return {
        fetchPositionEvaluation
    };
}