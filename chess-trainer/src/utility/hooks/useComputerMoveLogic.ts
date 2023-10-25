import { Chess } from "chess.js";
import { MAKE_MOVE } from "../../store/game/actions/actionTypes";
import { useGameState } from "../../store/game/contexts/GameContext";
import { isPromotion } from "../chessUtils";

export function useComputerMoveLogic() {
    const [_gameState, dispatch] = useGameState();
    
    const makeComputerMove = (nextMove: string, fen: string) => {
        const game = new Chess(fen);
        if (nextMove) {
            const moveResult = game.move(nextMove);
            if (moveResult) {
                dispatch({
                    type: MAKE_MOVE, payload: {
                        fen: moveResult.after,
                        isPromotion: isPromotion(moveResult),
                        san: moveResult.san
                    }
                });

            }
        }
    };
    return {
        makeComputerMove
    };
}