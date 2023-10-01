interface PotentialMove {
    move: string,
    occurrences: number
};

export const convertToFullMoves = (history: string[]): string[] => {
    const fullMoves = [];
    for (let i = 0; i < history.length; i += 2) {
        if (history[i + 1]) {
            fullMoves.push(`${history[i]} ${history[i + 1]}`);
        } else {
            fullMoves.push(history[i]);
        }
    }
    return fullMoves;
};

export const getMostProbableMove = (moveData: Record<string, number>): string => {
    let mostProbableMove = '';
    let highestOccurrence = 0;

    for (const move in moveData) {
        if (moveData[move] > highestOccurrence) {
            highestOccurrence = moveData[move];
            mostProbableMove = move;
        }
    }

    return mostProbableMove;
}

export function extractMoveDetails(movesString: string): [source: string, destination: string] {
    const moves = movesString.split(" ");
    return [moves[0], moves[1]];
}