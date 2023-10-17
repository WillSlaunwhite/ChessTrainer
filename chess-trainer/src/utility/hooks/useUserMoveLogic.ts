import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY } from "../../contexts/game/gameActions";

export function useUserMoveLogic(handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void) {
    const [gameState, dispatch] = useGameState();
    console.log(gameState);
    

    const handleMove = (source: string, destination: string) => {
        console.log("IN USE USER MOVE LOGIC");
        
        dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
        handleUserMoveUpdate(gameState.san, gameState.moveHistories);
    };

    return {
        handleMove
    };
}