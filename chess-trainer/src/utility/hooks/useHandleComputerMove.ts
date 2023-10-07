import { useGameState } from "../../contexts/game/game-context";
import { getMostProbableMove } from "../chessUtils";
import { useFetchNextMoves } from "./useFetchNextMoves";

interface PotentialMove {
    move: string;
    occurrences: number;
}

export function useHandleComputerMove() {
    const [gameState] = useGameState();
    const fetchedMoves: Record<string, number>[] = useFetchNextMoves(gameState.moveHistories);
    console.log("moveHistories at start of useHandleComputerMove:", gameState.moveHistories);


    const fetchProbableMoves = (): PotentialMove[] => {
        if (fetchedMoves && fetchedMoves.length) {
            return fetchedMoves.map(moveData => {
                console.log("HELLO");

                const move = getMostProbableMove(moveData);
                return {
                    move: move,
                    occurrences: moveData[move]
                };
            });
        }
        return [];
    }
    return fetchProbableMoves;
}