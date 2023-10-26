import { Chess } from "chess.js";
import { MAKE_MOVE } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";
import { isPromotion } from "../chessUtils";

export function useUserMoveLogic() {
    const [_gameState, dispatch] = useGameState();

    const handleMove = (source: string, destination: string, fen: string) => {
        const game = new Chess(fen);
        if (source && destination) {
            const moveResult = game.move({ from: source, to: destination });
            dispatch({
                type: MAKE_MOVE, payload: {
                    fen: moveResult.after,
                    san: moveResult.san,
                    isPromotion: isPromotion(moveResult)
                }
            });
        }
    };

    return {
        handleMove
    };
}