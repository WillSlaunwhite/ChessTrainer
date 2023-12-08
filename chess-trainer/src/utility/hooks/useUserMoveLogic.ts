import { Chess } from "chess.js";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE, RESET_TIMER, STOP_TIMER } from "../../store/game/types/actionTypes";
import { isPromotion } from "../chessUtils";
import { useHandleLineSwitch } from "./useHandleLineSwitch";

export function useUserMoveLogic() {
    const [gameState, dispatch] = useGameState();
    const handleLineSwitch = useHandleLineSwitch();
    const nextLineIndex = gameState.global.currentLineIndex === 2 ? 0 : gameState.global.currentLineIndex + 1;

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
            dispatch({ type: RESET_TIMER });
            handleLineSwitch.handleLineSwitch(nextLineIndex);
        }
    };

    return {
        handleMove
    };
}