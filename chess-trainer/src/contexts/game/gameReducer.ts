import { Chess, Square } from "chess.js";
import { GameState } from "./game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, GameActionTypes, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_ALT_FORMAT, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_NEXT_MOVES_ARRAY, SET_VARIATIONS, SWITCH_LINES, UPDATE_CURRENT_FENS, UPDATE_MOVE_HISTORIES } from "./gameActions";

export const isValidMove = (game: Chess, source: string, destination: string): boolean => {
    const validMoves = game.moves({ square: source as Square, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    let game: Chess;
    if (state.fen) game = new Chess(state.fen); else game = new Chess();

    switch (action.type) {
        case CHECK_MOVE_LEGALITY: {
            const { source, destination } = action.payload;
            const isValid: boolean = isValidMove(game, source, destination);
            if (isValid) {
                const pieceAtSource = game.get(source as Square);
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
                    const newSan = newMove.san;
                    const newFens = state.currentFens;
                    const newMoveHistories = state.moveHistories
                    console.log("***************** NEW MOVE: ", newMove);

                    newMoveHistories[state.currentLineIndex].push(newSan);
                    newFens[state.currentLineIndex] = game.fen();


                    // added this for troubleshooting purposes
                    return {
                        ...state,
                        fen: game.fen(),
                        currentFens: newFens,
                        selectedSquare: null,
                        san: newSan,
                        moveHistories: newMoveHistories,
                        lastMoveValid: isValid,
                    }
                }
            } else {
                return {
                    ...state,
                    selectedSquare: null
                }
            };
        }

        case EXECUTE_PAWN_PROMOTION:
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

        case GET_PIECE_AT_SQUARE:
            const { square } = action.payload;
            const squareInstance = game.get(square as Square);

            if (squareInstance) {
                return {
                    ...state,
                    pieceAtSquare: squareInstance.type,
                    colorOfPiece: squareInstance.color
                };
            } else {
                return {
                    ...state
                };
            }

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

        case MAKE_MOVE: {
            game.load(state.fen);
            const { source, destination } = action.payload;
            const newMoveHistories = state.moveHistories;
            const fens = state.currentFens;


            try {
                const moveResult = game.move({ from: source, to: destination });

                const wasMoveValid = !!moveResult;


                fens[state.currentLineIndex] = moveResult.after;
                newMoveHistories[state.currentLineIndex].push(moveResult.san);

                return {
                    ...state,
                    fen: moveResult.after,
                    currentFens: fens,
                    selectedSquare: null,
                    lastMoveValid: wasMoveValid,
                    moveHistories: newMoveHistories,
                    san: moveResult.san,
                    isComputerTurn: true,
                };
            } catch (error) {
                // * Invalid move
                console.error(error);

                return {
                    ...state,
                    selectedSquare: null,
                    lastMoveValid: false,
                };
            }
        }

        case MAKE_MOVE_ALT_FORMAT: {
            game.load(state.fen);
            const move = action.payload.move;
            const newMoveHistory = state.moveHistories[state.currentLineIndex];
            console.log("MOVE ALT: ", move);

            if (!newMoveHistory.includes(move) && move !== "") {
                const moveResult = game.move(move);
                const wasMoveValid = !!moveResult;

                if (!moveResult) {
                    console.log("NO MOVE RESULT: ", moveResult);
                    return state;
                } else {
                    console.log("MOVE RESULT: ", moveResult, "\tWAS MOVE VALID: ", wasMoveValid);

                    newMoveHistory.push(move);
                    const newMoveHistories = state.moveHistories;
                    const fens = state.currentFens;
                    newMoveHistories[state.currentLineIndex] = newMoveHistory;
                    fens[state.currentLineIndex] = moveResult.after;

                    const newNextMoves = state.nextMoves;
                    newNextMoves[state.currentLineIndex] = "";

                    return {
                        ...state,
                        fen: moveResult.after,
                        lastMoveValid: wasMoveValid,
                        san: moveResult.san,
                        moveHistories: newMoveHistories,
                        isComputerTurn: false,
                        isComputerReadyToMove: false,
                        nextMoves: newNextMoves,
                        currentFens: fens,
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
                selectedSquare: null,
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
            const newFens = state.currentFens;
            const newMoveHistories = state.moveHistories;

            game.reset();
            moves.forEach(move => { game.move(move); });
            newFens[lineIndex] = game.fen();
            newMoveHistories[lineIndex] = moves;
            console.log("NEW MOVE HISTORIES: ", newMoveHistories);
            console.log("GAME HISTORY: ", game.history());

            return {
                ...state,
                currentFens: newFens,
                moveHistories: newMoveHistories,
                fen: game.fen(),
            }

        case SET_CURRENT_LINE_NUMBER:
            return { ...state, currentLineIndex: action.payload.lineNumber }

        case SET_IS_COMPUTER_TURN:
            return { ...state, isComputerTurn: action.payload.isComputerTurn }

        case SET_IS_COMPUTER_READY_TO_MOVE:
            return { ...state, isComputerReadyToMove: action.payload.isComputerReadyToMove }

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

        case UPDATE_CURRENT_FENS:
            return {
                ...state,
                currentFens: action.payload.currentFens
            }

        default:
            return state;
    }
};
