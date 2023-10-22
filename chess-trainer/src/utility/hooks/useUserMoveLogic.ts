import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE } from "../../store/game/actions/gameActions";

export function useUserMoveLogic() {
    const [_gameState, dispatch] = useGameState();

    const handleMove = (source: string, destination: string) => {
        dispatch({
            type: MAKE_MOVE, payload: {
                source: source,
                destination: destination
            }
        });
    };

    return {
        handleMove
    };
}