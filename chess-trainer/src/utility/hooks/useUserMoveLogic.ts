import { MAKE_MOVE } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";

export function useUserMoveLogic() {
    const [_gameState, dispatch] = useGameState();

    const handleMove = (source?: string, destination?: string, move?: string) => {
    //     dispatch({
    //         type: MAKE_MOVE, payload: { }
    //     });
    };

    return {
        handleMove
    };
}