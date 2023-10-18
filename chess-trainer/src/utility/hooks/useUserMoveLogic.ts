import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE } from "../../contexts/game/gameActions";

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