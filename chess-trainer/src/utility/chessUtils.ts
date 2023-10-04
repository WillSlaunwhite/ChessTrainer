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

export function determineFirstComputerMove(baseSequence: string[]): Promise<string> {
    const lastMove = baseSequence[baseSequence.length - 1];

    if (baseSequence.length % 2 !== 0) {
        return fetchNextMoveForSequence(baseSequence);
    }

    return Promise.resolve(lastMove);
}

function fetchNextMoveForSequence(sequence: string[]): Promise<string> {
    console.log("SEQUENCE: ", sequence);
    
    return fetch('http://localhost:8085/api/chess/next-moves', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify([sequence])
    })
    .then(res => res.json())
    .then(data => {
        const probableMoves = Object.entries(data[0]);
        probableMoves.sort((a, b) => b[1] - a[1]);
        console.log("PROBABLE MOVES: ", probableMoves);
        return "";
        // return probableMoves[0][0].split(' ')[2];
    });
}