import { Chess } from "chess.js";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE_COMPUTER, SET_IS_COMPUTER_READY_TO_MOVE, START_TIMER } from "../../store/game/types/actionTypes";
import { isPromotion } from "../chessUtils";

export function useComputerMoveLogic() {
    const [gameState, dispatch] = useGameState();

    const makeComputerMove = (move: string, fen: string) => {
        const game = new Chess(fen);

        if (move) {
            var moveResult;
            console.log("hello??????c");


            if (move.split(' ').length > 1) {
                moveResult = game.move({ from: move.split(' ')[0], to: move.split(' ')[1] })
            } else {
                moveResult = game.move(move);
            }
            if (moveResult) {
                dispatch({
                    type: MAKE_MOVE_COMPUTER,
                    payload: {
                        fen: moveResult.after,
                        isPromotion: isPromotion(moveResult),
                        san: moveResult.san,
                        nextMove: ""
                    }
                });
            }
        }
        dispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: false, currentLineIndex: gameState.global.currentLineIndex } });
        dispatch({ type: START_TIMER });
    };
    return {
        makeComputerMove
    };
}