import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE_ALT_FORMAT } from "../../contexts/game/gameActions";

export function useComputerMoveLogic() {
    const [_gameState, dispatch] = useGameState();

    const makeComputerMove = (nextMove: string) => {
        if (nextMove) {
            dispatch({
                type: MAKE_MOVE_ALT_FORMAT, payload: {
                    move: nextMove
                }
            });
        }
    };
    return {
        makeComputerMove
    };
}