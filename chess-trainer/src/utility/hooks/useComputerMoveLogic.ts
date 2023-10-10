import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, MAKE_MOVE_ALT_FORMAT, SET_BOARD_FROM_HISTORY } from "../../contexts/game/gameActions";
import { extractMoveDetails } from "../chessUtils";
import { useHandleComputerMove } from "./useHandleComputerMove";

export function useComputerMoveLogic(nextMove: string) {
    const [gameState, dispatch] = useGameState();
    const compMoveFun = useHandleComputerMove();

    // useEffect(() => {
    //     console.log("moveHistories at start of useHandleComputerMove:", gameState.moveHistories);

    //     const potentialMoves = compMoveFun();
    //     console.log("POTENTIAL MOVES: ", potentialMoves);

    //     const nextMovePair = potentialMoves[lineIndex];
    //     if (nextMovePair) {
    //         const computerMove = extractMoveDetails(nextMovePair.move)[1];
    //         dispatch({ type: SET_NEXT_MOVE, payload: { nextMove: computerMove } });
    //     }
    // }, []);

    const makeComputerMove = () => {
        if (nextMove) {
            console.log("HOOOK MOVE: ", nextMove);

            const [source, destination] = extractMoveDetails(nextMove);
            dispatch({ type: CHECK_MOVE_LEGALITY, payload: { source, destination } });
            dispatch({ type: SET_BOARD_FROM_HISTORY });
            // dispatch({type: CHECK_MOVE_LEGALITY, payload: { source: nextMove[0], destination: nextMove[1] }})
        }
    };
    return {
        makeComputerMove
    };
}