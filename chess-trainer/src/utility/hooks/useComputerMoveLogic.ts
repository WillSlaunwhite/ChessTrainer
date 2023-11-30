import { Chess } from "chess.js";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE_COMPUTER } from "../../store/game/types/actionTypes";
import { isPromotion } from "../chessUtils";

export function useComputerMoveLogic() {
    const [_gameState, dispatch] = useGameState();
    
    const makeComputerMove = (nextMove: string, fen: string) => {
        const game = new Chess(fen);
        if (nextMove) {
            const moveResult = game.move(nextMove);
            if (moveResult) {
                dispatch({
                    type: MAKE_MOVE_COMPUTER, payload: {
                        fen: moveResult.after,
                        isPromotion: isPromotion(moveResult),
                        san: moveResult.san,
                        nextMove: ""
                    }
                });

            }
        }
    };
    return {
        makeComputerMove
    };
}