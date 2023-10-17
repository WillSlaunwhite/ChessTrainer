import { Chess } from "chess.js";

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

export function determineNextComputerMove(baseSequence: string[]): Promise<string> {
    const nextMove = baseSequence[baseSequence.length - 1];
    console.log("NEXT MOVE: ", nextMove);


    // TODO HARDCODED, NEED TO FIX!
    if (!isComputersTurn("black", baseSequence)) {
        return fetchNextMoveForSequence(baseSequence);
    }

    return Promise.resolve(nextMove);
}



function isComputersTurn(computerColor: string, moveSequence: string[]): boolean {
    if ((computerColor === "w" || computerColor === "white") && moveSequence.length % 2 === 1) {
        return true;
    } else if((computerColor === "b" || computerColor === "black") && moveSequence.length % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

export async function fetchOpening(openingName: string): Promise<OpeningDTO> {
    const response = await fetch(`http://localhost:8085/api/openings/${openingName}/start`);
    return response.json();
}

export async function processOpeningData(opening: OpeningDTO): Promise<{fen: string, moveHistories: string[][], currentFens: string[], initialMoves: string[], nextMoves: string[]}> { 
    const tempGame = new Chess();
    const baseSequence = opening.baseMovesSequence[0].split(/\s+/).map(move => move.replace(/^\d+\./, ''));
    const fens: string[] = [];
    const firstMoves: string[] = [];
    const fullMoveSequences = opening.variations.map(variation => {
        if(variation.movesSequence[0]) {
            return baseSequence.concat(variation.movesSequence);
        } else {
            return baseSequence;
        }
    });

    await Promise.all(fullMoveSequences.map(async (sequence: string[], i: number) => {
        const fullMoves = convertToFullMoves(sequence);
        const firstComputerMove = await determineNextComputerMove(fullMoves);

        if (firstComputerMove) { 
            console.log("FIRST COMPUTER MOVE: ", firstComputerMove);
            
            firstMoves[i] = firstComputerMove; 
        }

        fullMoves.map(movePair => {
            if (movePair !== "") {
                const moves: string[] = movePair.split(" ");
                moves.map(move => {
                    if(move !== ""){
                        tempGame.move(move);
                    }
                });
            }
        });

        if(!fens.includes(tempGame.fen())) {
            fens.push(tempGame.fen());
        }
        tempGame.reset();
    }));

    return {
        fen: fens[0],
        moveHistories: fullMoveSequences,
        currentFens: fens,
        initialMoves: firstMoves,
        nextMoves: firstMoves,
    };
}

async function fetchNextMoveForSequence(sequence: string[]): Promise<string> {
    console.log("SEQUENCE: ", sequence);
    try {
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
                console.log("PROBABLE MOVES: ", probableMoves);

                probableMoves.sort(((a: any, b: any) => b[1] - a[1]));
                console.log("PROBABLE MOVE SPLIT: ", probableMoves[0][0].split(' ')[1]);

                return probableMoves[0][0].split(' ')[1];
            });
    } catch (error) {
        console.warn('Failed to fetch the next move from the database. Using Stockfish to determine move...');
        return "";
    }
}