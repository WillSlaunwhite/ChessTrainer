import { GlobalState, LineState } from "../store/game/contexts/GameContext";
import { convertOpeningVariationsBaseSequenceToFullSequence, convertToFullMoves, getFensFromMoveSequences } from "../utility/chessUtils";

// * EVALUATION

interface EvaluationResponse { first: { bestMove: string }, second: { centipawns: number, principalVariation: string } }

export async function fetchEvaluation(fen: string, move: string): Promise<{ bestMove: string, centipawns: number, principalVariation: string }> {
    move = move.split(" ").length > 1 ? move.split(" ")[1] : move;

    try {
        return fetch('http://localhost:8085/api/chess/evaluate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fen, move })
        })
            .then(res => res.json())
            .then((data: EvaluationResponse) => {
                console.log(data);

                return { bestMove: data.first.bestMove, centipawns: data.second.centipawns, principalVariation: data.second.principalVariation };
            });
    } catch (error) {
        console.warn('Failed to fetch evaluation using Stockfish');
        console.error(error);
        return { bestMove: "", centipawns: 0, principalVariation: "" };
    }
}

// * NEXT MOVES

export async function fetchNextMoveForSequence(sequence: string[], fen: string): Promise<string> {
    console.log("In fetchNextMove 1");
    try {
        const response = await fetch('http://localhost:8085/api/chess/next-moves', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sequence, fen })
        });
        console.log("In fetchNextMove 2");

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        console.log("In fetchNextMove 3");
        const probableMoves = Object.entries(data[0]);
        probableMoves.sort(((a: any, b: any) => b[1] - a[1]));

        const move = probableMoves[0][0];
        if (probableMoves[0][1] === -1) {
            const regex = /^[a-h][1-8][a-h][1-8]$/;
            if (regex.test(move)) {
                return move.substring(0, 2) + ' ' + move.substring(2);
            }

            return move;
        }

        console.log("In fetchNextMove 4");
        return move.split(' ')[1];
    } catch (error) {
        console.error('Error in fetchNextMoveForSequence:', error);
        throw error; // Rethrow if you want to handle it in the outer catch block
    }
}

// * OPENINGS

export async function processOpeningData(opening: OpeningDTO, lines: LineState[]): Promise<{ global: GlobalState, lines: LineState[] }> {
    console.log("In processOpeningData");
    const fullMoveSequences = convertOpeningVariationsBaseSequenceToFullSequence(opening).map(sequence => convertToFullMoves(sequence));
    console.log("In processOpeningData 2");
    const fens = getFensFromMoveSequences(fullMoveSequences);
    console.log("In processOpeningData 3");
    const newLines: LineState[] = [];
    let firstMoves: string[] = [];

    try {
        const results = await Promise.allSettled(
            fullMoveSequences.map(async (sequence, i) => fetchNextMoveForSequence(sequence, fens[i]))
        );

        console.log("In processOpeningData 4");

        firstMoves = results.map(result => result.status === "fulfilled" ? result.value : "defaultMove");

        for (let i = 0; i < fullMoveSequences.length; i++) {
            const lineState: LineState = {
                ...lines[i],
                fen: fens[i],
                moveHistory: fullMoveSequences[i],
                nextMove: firstMoves[i]
            }
            newLines.push(lineState);
        }

        console.log("In processOpeningData 5");
    } catch (error) {
        console.error("Error processing moves:", error);
        // Handle the error appropriately
    }
    return {
        global: {
            currentLineIndex: 0,
            initialMoves: firstMoves,
            highlightedSquares: [],
            selectedSquare: "",
            variations: opening.variations,
            timerReset: false,
            timerStart: false
        },
        lines: newLines
    }
}

export async function fetchOpening(openingName: string): Promise<OpeningDTO> {
    console.log("In fetchOpening");
    const response = await fetch(`http://localhost:8085/api/openings/${openingName}/start`);
    console.log("In fetchOpening 2");
    return response.json();
}