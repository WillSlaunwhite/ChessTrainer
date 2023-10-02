import { useGameState } from "../../contexts/game/game-context";
import { useComputerMoveLogic } from "./useComputerMoveLogic";

export function useUserMoveLogic(handleUserMoveUpdate: (newMove: string, moveHistories: string[][]) => void) {
    const [gameState, dispatch] = useGameState();
    const { makeComputerMove } = useComputerMoveLogic(gameState.currentLineIndex);
}