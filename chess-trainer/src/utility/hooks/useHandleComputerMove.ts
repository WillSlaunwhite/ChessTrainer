import { useEffect, useState } from "react";
import { useGameState } from "../../contexts/game/game-context";
import { getMostProbableMove } from "../chessUtils";
import { useFetchNextMoves } from "./useFetchNextMoves";

interface PotentialMove {
    move: string;
    occurrences: number;
}

export function useHandleComputerMove(): PotentialMove[] {
    const [gameState] = useGameState();
    const fetchedMoves: Record<string, number>[] = useFetchNextMoves(gameState.moveHistories);

    const [probableMoves, setProbableMoves] = useState<PotentialMove[]>([]);

    useEffect(() => {
        if (fetchedMoves && fetchedMoves.length) {
            const mostProbableMoves = fetchedMoves.map(moveData => {
                const move = getMostProbableMove(moveData);
                return {
                    move: move,
                    occurrences: moveData[move]
                };
            });

            setProbableMoves(mostProbableMoves);
        }
    }, [fetchedMoves]);

    return probableMoves;
}