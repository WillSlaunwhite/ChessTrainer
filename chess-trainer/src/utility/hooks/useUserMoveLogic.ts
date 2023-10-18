import { useGameState } from "../../contexts/game/game-context";
import { MAKE_MOVE } from "../../contexts/game/gameActions";

export function useUserMoveLogic() {
    const [gameState, dispatch] = useGameState();
    console.log(gameState);

    // const handleMove = () => {
    //     if (to !== "") {

    //         dispatch({
    //             type: MAKE_MOVE, payload: {
    //                 source: from,
    //                 destination: to 
    //             }
    //         });
    // dispatch({ type: SET_BOARD_FROM_HISTORY });
    // dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: false } });
    // dispatch({ type: SET_IS_COMPUTER_READY_TO_MOVE, payload: { isComputerReadyToMove: false } });
    // }
    // };


    const handleMove = (source: string, destination: string) => {
        console.log("IN USE USER MOVE LOGIC");

        dispatch({
            type: MAKE_MOVE, payload: {
                source: source,
                destination: destination
            }
        });
    };

    return {
        handleMove
    };
}