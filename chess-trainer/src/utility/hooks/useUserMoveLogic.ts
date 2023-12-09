import { Chess } from "chess.js";
import { useGameState } from "../../store/game/contexts/GameContext";
import { MAKE_MOVE, RESET_TIMER } from "../../store/game/types/actionTypes";
import { isPromotion } from "../chessUtils";
import { useHandleLineSwitch } from "./useHandleLineSwitch";

export function useUserMoveLogic() {
    const [gameState, dispatch] = useGameState();
    const handleLineSwitch = useHandleLineSwitch();
    const activeLines = gameState.lines
        .map((line, index) => line.isActive ? index : -1)
        .filter(index => index !== -1);

    const nextLineIndex = () => {
        const currentLineIndex = gameState.global.currentLineIndex;
        const currentIndexInActiveLines = activeLines.indexOf(currentLineIndex);
        const nextIndexInActiveLines = (currentIndexInActiveLines + 1) % activeLines.length;
        return activeLines[nextIndexInActiveLines];
    }

    const handleMove = (source: string, destination: string, fen: string) => {
        const game = new Chess(fen);

        if (source && destination) {
            const moveResult = game.move({ from: source, to: destination, promotion: "q" });

            dispatch({
                type: MAKE_MOVE, payload: {
                    fen: moveResult.after,
                    san: moveResult.san,
                    isPromotion: isPromotion(moveResult)
                }
            });
            dispatch({ type: RESET_TIMER });
            handleLineSwitch.handleLineSwitch(nextLineIndex());
        }
    };

    return {
        handleMove
    };
}