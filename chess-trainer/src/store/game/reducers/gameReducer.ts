import { getLastMoveSquares, getPieceAtSquare, updateLineState, updateLineStateForComputer } from "../../../utility/chessUtils";
import { GameActionTypes } from "../actions/gameActions";
import { GameState } from "../contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, GET_PIECE_AT_SQUARE, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_COMPUTER, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_VARIATIONS, SWITCH_LINE, UPDATE_FEN_FOR_LINE } from "../types/actionTypes";

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    switch (action.type) {
        case CLEAR_SELECTED_SQUARES: {
            return {
                ...state,
                global: {
                    ...state.global,
                    selectedSquares: []
                }
            }
        }
        
        // case EXECUTE_PAWN_PROMOTION:
        //     return {
        //         ...state,
        //     };

        case GET_PIECE_AT_SQUARE: {
            const lines = [...state.lines];
            const currentLineIndex = action.payload.lineNumber;
            const { type, color } = getPieceAtSquare(lines[currentLineIndex].fen, action.payload.square);

            lines[currentLineIndex] = {
                ...lines[currentLineIndex],
                pieceAtSquare: type,
                colorOfPiece: color
            }

            return {
                ...state,
                lines
            }
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
            return {
                ...state,
                global: action.payload.global,
                lines: action.payload.lines,
            };


        case MAKE_MOVE: {
            const { fen, san, isPromotion } = action.payload;
            const currentLineIndex = state.global.currentLineIndex;
            const nextLineIndex = (currentLineIndex + 1) % 3;
            const updatedLines = updateLineState(state.lines, currentLineIndex, { fen, san, isPromotion });
            const selectedSquares = getLastMoveSquares(updatedLines[nextLineIndex].moveHistory);

            return {
                ...state,
                lines: updatedLines,
                global: {
                    ...state.global,
                    currentLineIndex: nextLineIndex,
                    selectedSquares: Array.from([selectedSquares.from, selectedSquares.to])
                }
            };
        }


        case MAKE_MOVE_COMPUTER: {
            const { fen, san, isPromotion, nextMove } = action.payload;
            const currentLineIndex = state.global.currentLineIndex;

            const updatedLines = updateLineStateForComputer(state.lines, currentLineIndex, { fen, san, isPromotion, nextMove });
            const selectedSquares = getLastMoveSquares(updatedLines[currentLineIndex].moveHistory);

            return {
                ...state,
                lines: updatedLines,
                global: {
                    ...state.global,
                    selectedSquares: [selectedSquares.from, selectedSquares.to]
                }
            };
        }

        // case MAKE_MOVE_WITH_PROMOTION: 


        case SELECT_SQUARE:
            const updatedSquares = new Set(state.global.selectedSquares);
            if (updatedSquares.has(action.payload.square)) {
                updatedSquares.delete(action.payload.square);
            } else {
                updatedSquares.add(action.payload.square);
            }
            return {
                ...state,
                global: {
                    ...state.global,
                    selectedSquares: Array.from(updatedSquares)
                }
            };

        // case SET_BOARD_FROM_HISTORY:
        //     const lineIndex = state.currentLineIndex;
        //     const moves = state.moveHistories[lineIndex].filter(move => move !== "");
        //     const newFens = state.currentFens;
        //     const newMoveHistories = state.moveHistories;

        //     game.reset();
        //     moves.forEach(move => { game.move(move); });
        //     newFens[lineIndex] = game.fen();
        //     newMoveHistories[lineIndex] = moves;
        //     console.log("NEW MOVE HISTORIES: ", newMoveHistories);
        //     console.log("GAME HISTORY: ", game.history());

        //     return {
        //         ...state,
        //         currentFens: newFens,
        //         moveHistories: newMoveHistories,
        //         fen: game.fen(),
        //     }


        case SET_IS_COMPUTER_TURN: {
            const updatedLines = state.lines;

            updatedLines[action.payload.currentLineIndex] = {
                ...updatedLines[action.payload.currentLineIndex],
                isComputerTurn: action.payload.isComputerTurn
            }

            return { ...state, lines: updatedLines }
        }

        case SET_IS_COMPUTER_READY_TO_MOVE: {
            const updatedLines = state.lines;

            updatedLines[action.payload.currentLineIndex] = {
                ...updatedLines[action.payload.currentLineIndex],
                isComputerReadyToMove: action.payload.isComputerReadyToMove
            }

            return { ...state, lines: updatedLines }
        }

        case SET_HIGHLIGHT_SQUARES: {
            const squares = Array.from([action.payload.from, action.payload.to]);
            
            return {
                ...state,
                global: {
                    ...state.global,
                    selectedSquares: squares
                }
            }
        }

        case SET_NEXT_MOVE: {
            const updatedLines = state.lines;

            updatedLines[action.payload.currentLineIndex] = {
                ...updatedLines[action.payload.currentLineIndex],
                nextMove: action.payload.nextMove
            }

            return {
                ...state,
                lines: updatedLines
            }
        }

        case SET_VARIATIONS:
            return {
                ...state,
                global: {
                    ...state.global,
                    variations: action.payload.variations,
                }
            }

        case SWITCH_LINE:
            return {
                ...state,
                global: {
                    ...state.global,
                    currentLineIndex: action.payload.lineIndex
                }
            }

        case UPDATE_FEN_FOR_LINE:
            const updatedLines = [...state.lines];
            updatedLines[action.payload.lineIndex] = {
                ...updatedLines[action.payload.lineIndex],
                fen: action.payload.fen
            }
            return {
                ...state,
                lines: updatedLines
            }

        default:
            return state;
    }
};
