import { Chess, Square } from "chess.js";
import { GameState } from "../contexts/GameContext";
import { isComputersTurn } from "../../../utility/chessUtils";
import { EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_ALT_FORMAT, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_TURN, SET_IS_COMPUTER_READY_TO_MOVE, SET_NEXT_MOVE, SET_NEXT_MOVES_ARRAY, SET_VARIATIONS, SWITCH_LINES, UPDATE_CURRENT_FENS, UPDATE_MOVE_HISTORIES } from "../actions/actionTypes";
import { GameActionTypes } from "../actions/gameActions";

export const isValidMove = (game: Chess, source: string, destination: string): boolean => {
    const validMoves = game.moves({ square: source as Square, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    switch (action.type) {
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
                global: {
                    ...state.global,
                    currentLineIndex: state.global.currentLineIndex + 1,
                }
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
                isComputerTurn: true,
                currentLineIndex: 0,
            };

        case MAKE_MOVE: {
            const { fen, san, isPromotion } = action.payload;
            const currentLineIndex = state.global.currentLineIndex;
            const nextLineIndex = currentLineIndex === 2 ? 0 : currentLineIndex + 1;
            const updatedLines = [...state.lines];

            updatedLines[currentLineIndex] = {
                ...updatedLines[currentLineIndex],
                fen,
                moveHistory: [...updatedLines[currentLineIndex].moveHistory, san],
                isPawnPromotion: isPromotion
            }

            try {
                const moveResult = game.move({ from: source, to: destination });
                const wasMoveValid = !!moveResult;

                fens[currentLineIndex] = moveResult.after;
                newMoveHistories[currentLineIndex].push(moveResult.san);

                const isComputerTurn = isComputersTurn(newMoveHistories[nextLineIndex], state.computerColor);

                return {
                    ...state,
                    currentFens: fens,
                    currentLineIndex: nextLineIndex,
                    fen: state.currentFens[nextLineIndex],
                    isComputerTurn: isComputerTurn,
                    lastMoveValid: wasMoveValid,
                    moveHistories: newMoveHistories,
                    san: moveResult.san,
                    selectedSquare: null,
                };
            } catch (error) {
                // * Invalid move
                console.error(error);

                return {
                    ...state,
                    lastMoveValid: false,
                    selectedSquare: null,
                };
            };
        }

        case MAKE_MOVE_ALT_FORMAT: {
            console.log(state);

            game.load(state.fen);
            const newMoveHistories = state.moveHistories;
            const fens = state.currentFens;
            const nextMoves = state.nextMoves;
            const currentLineIndex = state.currentLineIndex;
            const move = action.payload.move !== "" ? action.payload.move : nextMoves[currentLineIndex];
            const nextLineIndex = currentLineIndex === 2 ? 0 : currentLineIndex + 1;

            try {
                const moveResult = game.move(move);
                const wasMoveValid = !!moveResult;

                fens[currentLineIndex] = moveResult.after;
                newMoveHistories[currentLineIndex].push(moveResult.san);
                nextMoves[currentLineIndex] = "";

                const isComputerTurn = isComputersTurn(newMoveHistories[nextLineIndex], state.computerColor);
                return {
                    ...state,
                    currentFens: fens,
                    fen: fens[currentLineIndex],
                    isComputerTurn: isComputerTurn,
                    isComputerReadyToMove: false,
                    lastMoveValid: wasMoveValid,
                    moveHistories: newMoveHistories,
                    nextMoves: nextMoves,
                    san: "",
                    selectedSquare: null,
                };
            } catch (error) {
                console.error(error);
                return {
                    ...state,
                    lastMoveValid: false,
                }
            }
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
            const currentLineIndex = action.payload.currentLineIndex;
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

        case UPDATE_CURRENT_FENS:
            return {
                ...state,
                currentFens: action.payload.currentFens
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
