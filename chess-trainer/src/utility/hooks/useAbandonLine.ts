import { useGameState } from "../../store/game/contexts/GameContext";
import { DEACTIVATE_LINE } from "../../store/game/types/actionTypes";
import { useHandleLineSwitch } from "./useHandleLineSwitch";

export function useAbandonLine() {
    const [_gameState, dispatch] = useGameState();
    const handleLineSwitch = useHandleLineSwitch();

    const abandonLine = (lineNumber: number) => {
        const nextLineIndex = lineNumber === 2 ? 0 : lineNumber + 1;
        dispatch({ type: DEACTIVATE_LINE, payload: { lineNumber: lineNumber } });
        handleLineSwitch.handleLineSwitch(nextLineIndex);
    }
    return {
        abandonLine
    }
}