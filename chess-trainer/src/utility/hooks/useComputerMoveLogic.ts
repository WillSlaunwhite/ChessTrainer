import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { useHandleComputerMove } from "./useHandleComputerMove";
import { extractMoveDetails } from "../chessUtils";
import { CHECK_MOVE_LEGALITY, SET_NEXT_MOVE } from "../../contexts/game/gameActions";

export function useComputerMoveLogic(currentLineIndex: number) {
    const [gameState, dispatch] = useGameState();
    const potentialMoves = useHandleComputerMove();

    useEffect(() => {
        const nextMovePair = potentialMoves[currentLineIndex];
        if (nextMovePair) {
            const computerMove = extractMoveDetails(nextMovePair.move)[1];
			dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: computerMove, lineIndex: currentLineIndex } });
        }
    }, [gameState.san]);

    const makeComputerMove = () => {
        const move = gameState.nextMoves[currentLineIndex];
        if (move) {
            const [source, destination] = extractMoveDetails(move);
            dispatch({ type: CHECK_MOVE_LEGALITY, payload: {source, destination}});
        }
    };

    return {
        makeComputerMove
    };
}