import { useGameState } from "../../contexts/game/game-context";
import { CHECK_MOVE_LEGALITY, MAKE_MOVE_ALT_FORMAT, SET_BOARD_FROM_HISTORY, SET_IS_COMPUTER_TURN } from "../../contexts/game/gameActions";
import { extractMoveDetails } from "../chessUtils";
import { useHandleComputerMove } from "./useHandleComputerMove";

export function useComputerMoveLogic(nextMove: string) {
    const [gameState, dispatch] = useGameState();
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
            console.log("HOOOK MOVE: ", nextMove);

            dispatch({
                type: MAKE_MOVE_ALT_FORMAT, payload: {
                    move: gameState.nextMoves[gameState.currentLineIndex]
                }
            });
            dispatch({ type: SET_BOARD_FROM_HISTORY });
            dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: false } });
        }
    };
    return {
        makeComputerMove
    };
}