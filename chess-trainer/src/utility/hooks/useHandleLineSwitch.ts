import { useGameState } from "../../store/game/contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, SET_IS_COMPUTER_TURN, START_TIMER, SWITCH_LINE } from "../../store/game/types/actionTypes";
import { getLastMoveSquares, isComputersTurn } from "../chessUtils";

export function useHandleLineSwitch() {
    const [gameState, dispatch] = useGameState();

    const handleLineSwitch = (lineIndex: number) => {
        const line = gameState.lines[lineIndex];
        const lastMoves = getLastMoveSquares(line.moveHistory);
        if (!isComputersTurn(line.moveHistory, line.computerColor)) dispatch({ type: START_TIMER})
        
        if (lastMoves) {
            dispatch({ type: SWITCH_LINE, payload: { lineIndex: lineIndex } });
            dispatch({ type: CLEAR_SELECTED_SQUARES })
            dispatch({ type: SET_HIGHLIGHT_SQUARES, payload: { squares: [lastMoves.from, lastMoves.to] } })
            dispatch({ type: SELECT_SQUARE, payload: { square: "" } })
            dispatch({ type: SET_IS_COMPUTER_TURN, payload: { isComputerTurn: isComputersTurn(line.moveHistory, line.computerColor), currentLineIndex: lineIndex } });
        }
    }

    return {
        handleLineSwitch
    }
}