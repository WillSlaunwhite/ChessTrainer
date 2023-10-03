import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY } from "../../contexts/game/gameActions";
import { useComputerMoveLogic } from "./useComputerMoveLogic";

export function useUserMoveLogic(handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void) {
    const [gameState, dispatch] = useGameState();
    const { makeComputerMove } = useComputerMoveLogic(gameState.currentLineIndex);

    const handleMove = (source: string, destination: string) => {
        dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });

        handleUserMoveUpdate(gameState.san, gameState.moveHistories);
    };

    useEffect(() => {
        if (gameState.isComputerTurn === true) {
            makeComputerMove();
        }
    });


    return {
        handleMove
    };
}