import { Chess, ChessInstance, Square } from "chess.js";
import { GameState } from "./game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, GameActionTypes, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_ALT_FORMAT, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_NEXT_MOVES_ARRAY, SET_VARIATIONS, SWITCH_LINES, UPDATE_MOVE_HISTORIES } from "./gameActions";

export const isValidMove = (game: ChessInstance, source: string, destination: string): boolean => {
    const validMoves = game.moves({ square: source, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    let game: ChessInstance;
    if (state.fen) game = new Chess(state.fen); else game = new Chess();

    switch (action.type) {
        case CHECK_MOVE_LEGALITY: {
            const { source, destination } = action.payload;
            const isValid: boolean = isValidMove(game, source, destination);
            if (isValid) {
                const pieceAtSource = game.get(source);
                if (pieceAtSource?.type === 'p' &&
                    ((pieceAtSource.color === 'w' && destination[1] === '8') ||
                        (pieceAtSource.color === 'b' && destination[1] === '1'))) {
                    return {
                        ...state,
                        isPawnPromotion: true,
                        promotionSource: source,
                        promotionDestination: destination
                    };
                } else {
                    const newMove = game.move({ from: source, to: destination });
                    const newSan = newMove.san
                    console.log("***************** NEW MOVE: ", newMove);

                    const newMoveHistories = [
                        ...state.moveHistories,
                        newSan
                    ]


                    // added this for troubleshooting purposes
                    return {
                        ...state,
                        fen: game.fen(),
                        selectedSquare: null,
                        san: newSan,
                        moveHistories: newMoveHistories
                    }
                }
            } else {
                return {
                    ...state,
                    selectedSquare: null
                }
            };
        }

        case EXECUTE_PAWN_PROMOTION: {
            const { source, destination, promotion } = action.payload;
            const newMove = game.move({ from: source, to: destination, promotion: promotion });
            const newSan = newMove.san;

            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null,
                isPawnPromotion: false,
                san: newSan
            };
        }

        case GET_PIECE_AT_SQUARE:
            const { square } = action.payload;
            const color = game.get(square as Square)?.color;
            const piece = game.get(square as Square)?.type;
            return {
                ...state,
                pieceAtSquare: piece,
                colorOfPiece: color
            };

        case INCREMENT_LINE:
            return {
                ...state,
                currentLineIndex: state.currentLineIndex + 1
            };

        case INIT_GAME:
            game.load(action.payload.fen);

            console.log("New state after INIT_GAME:", {
                ...state,
                fen: action.payload.fen,
                moveHistories: action.payload.moveHistories,
                currentFens: action.payload.currentFens,
                initialMoves: action.payload.initialMoves,
                nextMoves: action.payload.nextMoves,
                // isComputerTurn: true
            });

            return {
                ...state,
                fen: action.payload.fen,
                moveHistories: action.payload.moveHistories,
                currentFens: action.payload.currentFens,
                initialMoves: action.payload.initialMoves,
                nextMoves: action.payload.nextMoves,
                isComputerTurn: true
            };

        // case MAKE_MOVE: {
        //     const { source, destination } = action.payload;
        //     game.load(state.fen);

        //     const moveResult = game.move({ from: source, to: destination });
        //     const wasMoveValid = !!moveResult;

        //     return {
        //         ...state,
        //         fen: game.fen(),
        //         selectedSquare: null,
        //         lastMoveValid: wasMoveValid,
        //         san: moveResult.san,
        //     };
        // }

        case MAKE_MOVE_ALT_FORMAT: {
            // game.load(state.fen);
            const move = action.payload.move;
            const newMoveHistory = state.moveHistories[state.currentLineIndex]
            console.log("MOVE ALT: ", move);

            if (!newMoveHistory.includes(move) && move !== "") {
                const moveResult = game.move(move);
                const wasMoveValid = !!moveResult;

                if (!moveResult) {
                    console.log("NO MOVE RESULT: ", moveResult)
                    return state
                } else {
                    console.log("MOVE RESULT: ", moveResult, "\tWAS MOVE VALID: ", wasMoveValid);
                    console.log("IS COMPUTER TURN: ", state.isComputerTurn);

                    newMoveHistory.push(move);
                    const newMoveHistories = state.moveHistories;
                    newMoveHistories[state.currentLineIndex] = newMoveHistory;
                    
                    return {
                        ...state,
                        reformattedMove: `${moveResult.from} ${moveResult.to}`,
                        fen: game.fen(),
                        lastMoveValid: wasMoveValid,
                        san: moveResult.san,
                        moveHistories: newMoveHistories,
                        isComputerTurn: false,
                    };
                }
            }

            return state;
        }

        case MAKE_MOVE_WITH_PROMOTION: {
            const { source, destination, promotionPiece } = action.payload;

            if (!isValidMove(game, source, destination)) {
                return {
                    ...state,
                    selectedSquare: null
                }
            }

            game.move({ from: source, to: destination, promotion: promotionPiece });
            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null
            };
        }

        case SELECT_SQUARE:
            return {
                ...state,
                selectedSquare: action.payload.square
            };

        case SET_BOARD_FROM_HISTORY:
            const lineIndex = state.currentLineIndex;
            const moves = state.moveHistories[lineIndex].filter(move => move !== "");

            game.reset();
            moves.forEach(move => { game.move(move); });

            return {
                ...state,
                currentFens: {
                    ...state.currentFens,
                    [lineIndex]: game.fen()
                },
                moveHistories: {
                    ...state.moveHistories,
                    [lineIndex]: moves
                },
                fen: game.fen(),
            }

        case SET_CURRENT_LINE_NUMBER:
            return { ...state, currentLineIndex: action.payload.lineNumber }

        case SET_IS_COMPUTER_TURN:
            return { ...state, isComputerTurn: action.payload.isComputerTurn }

        case SET_NEXT_MOVE:
            const currentLineIndex = state.currentLineIndex;
            const nextMove = action.payload.nextMove;
            const updatedNextMoves = [...state.nextMoves];

            updatedNextMoves[currentLineIndex] = nextMove;

            return {
                ...state,
                nextMoves: updatedNextMoves
            }

        case SET_NEXT_MOVES_ARRAY:
            return {
                ...state,
                nextMoves: action.payload.nextMoves
            }

        case SET_VARIATIONS:
            return {
                ...state,
                variations: action.payload.variations
            }

        case SWITCH_LINES:
            return {
                ...state,
                fen: action.payload.fen,
            }

        case UPDATE_MOVE_HISTORIES:
            const filteredMoveHistories = action.payload.moveHistories.map(subArray =>
                subArray.filter(move => move !== "")
            );
            return {
                ...state,
                moveHistories: filteredMoveHistories
            }

        default:
            return state;
    }
};
