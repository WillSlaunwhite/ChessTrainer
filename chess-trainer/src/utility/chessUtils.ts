import { Chess } from "chess.js";

// export function determineNextComputerMove(baseSequence: string[]): string {
//     const nextMove = await fetchNextMoveForSequence(baseSequence);
//     return nextMove;
// }

export function convertToFullMoves(history: string[]): string[] {
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

export function isComputersTurn(moveSequence: string[], computerColor: string): boolean {
    const isWhite = computerColor === 'white' || computerColor === 'w';
    return (isWhite && moveSequence.length % 2 === 1) || (!isWhite && moveSequence.length % 2 === 0);
}


export function getProbableMove(moveData: Record<string, number>): string {
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

export function convertOpeningVariationsBaseSequenceToFullSequence(opening: OpeningDTO): string[][] {
    const baseSequence = opening.baseMovesSequence;
    return opening.variations.map((variation: VariationDTO) => {
        if (variation.movesSequence[0]) {
            return baseSequence.concat(variation.movesSequence);
        } else {
            return baseSequence;
        }
    });
}

export function getFensFromMoveSequence(moveSequences: string[][]): string[] {
    const tempGame = new Chess();
    const fens: string[] = [];
    moveSequences.forEach(sequence => {
        sequence.forEach(movePair => {
            if (movePair !== "") {
                const moves: string[] = movePair.split(" ");
                moves.forEach(move => {
                    if (move !== "") {
                        tempGame.move(move);
                    }
                })
            }
        });

        if (!fens.includes(tempGame.fen())) {
            fens.push(tempGame.fen());
        }
    });

    return fens;
}