import { MAKE_MOVE_ALT_FORMAT } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";

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