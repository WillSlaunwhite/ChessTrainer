import { GlobalState, LineState } from "../store/game/contexts/GameContext";
import { convertOpeningVariationsBaseSequenceToFullSequence, convertToFullMoves, getFensFromMoveSequences } from "../utility/chessUtils";

export async function fetchOpening(openingName: string): Promise<OpeningDTO> {
    const response = await fetch(`http://localhost:8085/api/openings/${openingName}/start`);
    return response.json();
}

export async function fetchNextMoveForSequence(sequence: string[]): Promise<string> {
    console.log(sequence);
    
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
                probableMoves.sort(((a: any, b: any) => b[1] - a[1]));
                console.log(probableMoves);
                
                return probableMoves[0][0].split(' ')[1];
            });
    } catch (error) {
        console.warn('Failed to fetch the next move from the database. Using Stockfish to determine move...');
        return "";
    }
}

export async function processOpeningData(opening: OpeningDTO, lines: LineState[]): Promise<{ global: GlobalState, lines: LineState[] }> {
    const fullMoveSequences = convertOpeningVariationsBaseSequenceToFullSequence(opening).map(sequence => convertToFullMoves(sequence));
    console.log("FULL MOVES SEQUENCES: ", fullMoveSequences);

    const firstMoves = await Promise.all(
        fullMoveSequences.map(async sequence => {
            return await fetchNextMoveForSequence(sequence);
        })
    );

    const fens = getFensFromMoveSequences(fullMoveSequences);
    const newLines: LineState[] = [];

    for (let i = 0; i < fullMoveSequences.length; i++) {
        const lineState: LineState = {
            ...lines[i],
            fen: fens[i],
            moveHistory: fullMoveSequences[i],
            nextMove: firstMoves[i]
        }
        newLines.push(lineState);
    }

    return {
        global: {
            currentLineIndex: 0,
            initialMoves: firstMoves,
            selectedSquares: [],
            variations: opening.variations
        },
        lines: newLines
    }
}