import { Chess } from "chess.js";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE_COMPUTER } from "../../store/game/types/actionTypes";
import { isPromotion } from "../chessUtils";

export function useComputerMoveLogic() {
    const [_gameState, dispatch] = useGameState();

    const makeComputerMove = (move: string, fen: string) => {
        const game = new Chess(fen);

        if (move) {
            var moveResult;
            
            if (move.split(' ').length > 1) {
                moveResult = game.move({ from: move.split(' ')[0], to: move.split(' ')[1] });
            } else {
                moveResult = game.move(move);
            }
            console.log("hello2");

            dispatch({
                type: MAKE_MOVE_COMPUTER, payload: {
                    fen: moveResult.after,
                    isPromotion: isPromotion(moveResult),
                    san: moveResult.san,
                    nextMove: ""
                }
            });
        }
    };
    return {
        makeComputerMove
    };
}