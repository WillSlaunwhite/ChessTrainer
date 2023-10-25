import { Chess, Move, Piece, Square } from "chess.js";


export function appendToMoveHistory(history: string[], san: string): string[] {
    const halfMoves = convertToHalfMoves(history);
    
    if (halfMoves.length % 2 === 0) {
        const newHistory = [...history]; 
        newHistory.push(san);
        return newHistory;
    } else {
        const lastMove = history[history.length - 1];
        const newHistory =  history.slice(0, -1);       
        newHistory.push(`${lastMove} ${san}`);
        return newHistory;
    }
}

export function convertToHalfMoves(history: string[]): string[] {
    return history.flatMap(sequence => sequence.split(" "));
}

export function convertToFullMoves(history: string[]): string[] {
    const fullMoves = [];
    for (let i = 0; i < history.length; i += 2) {
        if (history[i + 1]) {
            fullMoves.push(`${history[i]} ${history[i + 1]}`);
        } else {
            fullMoves.push(history[i]);
        }
    }
    console.log("FULL MOVES HELPER: ", fullMoves);

    return fullMoves;
};

export function convertOpeningVariationsBaseSequenceToFullSequence(opening: OpeningDTO): string[][] {
    const baseSequence = splitMoveString(opening.baseMovesSequence[0]);
    return opening.variations.map((variation: VariationDTO) => {
        if (variation.movesSequence[0]) {
            return baseSequence.concat(variation.movesSequence);
        } else {
            return baseSequence;
        }
    });
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

export function getPieceAtSquare(fen: string, square: string): Piece {
    const tempGame = new Chess(fen);
    return tempGame.get(square as Square);
}

export function getFensFromMoveSequences(moveSequences: string[][]): string[] {
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
        tempGame.reset();
    });

    return fens;
}

export function isComputersTurn(moveSequence: string[], computerColor: string): boolean {
    const isWhite = computerColor === 'white' || computerColor === 'w';
    return (isWhite && moveSequence.length % 2 === 0) || (!isWhite && moveSequence.length % 2 === 1);
}

export function isPromotion(move: Move): boolean {
    return move.flags.includes('p');
}

export const isValidMove = (fen: string, source: string, destination: string): boolean => {
    const tempGame = new Chess(fen);
    const validMoves = tempGame.moves({ square: source as Square, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export function splitMoveString(moves: string): string[] {
    return moves
        .split(/\d+\./) // split based on move numbers
        .join(' ')
        .split(/\s+/)
        .filter(Boolean); // remove empty strings
}