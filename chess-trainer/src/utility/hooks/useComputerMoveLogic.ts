import { useEffect } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { useHandleComputerMove } from "./useHandleComputerMove";
import { extractMoveDetails } from "../chessUtils";
import { CHECK_MOVE_LEGALITY, SET_NEXT_MOVE } from "../../contexts/game/gameActions";

export function useComputerMoveLogic() {
    const [gameState, dispatch] = useGameState();
    const compMoveFun = useHandleComputerMove();
    const lineIndex = gameState.currentLineIndex;
    const nextMoves = gameState.nextMoves;

    useEffect(() => {
        console.log("moveHistories at start of useHandleComputerMove:", gameState.moveHistories);

        const potentialMoves = compMoveFun();
        console.log("POTENTIAL MOVES: ", potentialMoves);

        const nextMovePair = potentialMoves[lineIndex];
        if (nextMovePair) {
            const computerMove = extractMoveDetails(nextMovePair.move)[1];
            dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: computerMove, lineIndex: lineIndex } });
        }
    }, []);

    // useEffect(() => {
    const makeComputerMove = () => {
        console.log(gameState);

        const move = nextMoves[lineIndex];
        if (move) {
            const [source, destination] = extractMoveDetails(move);
            dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
        }
        // }, [nextMoves[lineIndex]]);
    };
    return {
        makeComputerMove
    };
}