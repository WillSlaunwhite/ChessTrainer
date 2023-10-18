import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE_ALT_FORMAT } from "../../contexts/game/gameActions";

export function useComputerMoveLogic(nextMove: string) {
    const [_gameState, dispatch] = useGameState();
    // const compMoveFun = useHandleComputerMove();

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
            console.log("makeComputerMove: ", nextMove);

            dispatch({
                type: MAKE_MOVE_ALT_FORMAT, payload: {
                    move: nextMove
                }
            });
            // dispatch({ type: SET_BOARD_FROM_HISTORY });
            // dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: false } });
            // dispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: false } });
        }
    };
    return {
        makeComputerMove
    };
}