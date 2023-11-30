import { useGameState } from "../../store/game/contexts/GameContext";
import { SET_HIGHLIGHT_SQUARES } from "../../store/game/types/actionTypes";
import { getLastMoveSquares } from "../chessUtils";

const handleLineSwitch = (lineIndex: number) => {
    const [gameState, dispatch] = useGameState();
    const currentLine = gameState.lines[lineIndex];
    const lastMoveSan = currentLine.moveHistory.slice(-1)[0];

    if (lastMoveSan) {
        // const lastMove = getLastMoveSquares();
        // if (lastMove) {
        //     dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { from: lastMove.from, to: lastMove.to }})
        // }
    }
}