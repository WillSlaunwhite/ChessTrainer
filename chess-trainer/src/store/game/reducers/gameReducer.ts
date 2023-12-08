import { getLastMoveSquares, getPieceAtSquare, updateLineState, updateLineStateForComputer } from "../../../utility/chessUtils";
import { GameActionTypes } from "../actions/gameActions";
import { GameState } from "../contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, GET_PIECE_AT_SQUARE, HIGHLIGHT_LAST_MOVES, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_COMPUTER, RESET_TIMER, SELECT_SQUARE, SET_HIGHLIGHT_SQUARES, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_VARIATIONS, START_TIMER, STOP_TIMER, SWITCH_LINE, UPDATE_EVALUATION } from "../types/actionTypes";

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    switch (action.type) {
        case CLEAR_SELECTED_SQUARES: {
            return {
                ...state,
                global: {
                    ...state.global,
                    highlightedSquares: []
                }
            }
        }

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

        case HIGHLIGHT_LAST_MOVES: {
            const lastMoves = state.global.highlightedSquares.length === 2 ? state.global.highlightedSquares : state.global.highlightedSquares.slice(0, 2);
            return {
                ...state,
                global: {
                    ...state.global,
                    highlightedSquares: lastMoves,
                }
            }
        }

        case INCREMENT_LINE:
            const currentLineIndex = state.global.currentLineIndex;
            const nextLineIndex = (currentLineIndex + 1) % 3;
            return {
                ...state,
                global: {
                    ...state.global,
                    currentLineIndex: nextLineIndex,
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
                    highlightedSquares: [selectedSquares.from, selectedSquares.to]
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
                    highlightedSquares: [selectedSquares.from, selectedSquares.to]
                }
            };
        }

        case RESET_TIMER:
            return { ...state, global: { ...state.global, timerReset: true, timerStart: false } };

        case SELECT_SQUARE:
            const updatedSquare = state.global.selectedSquare !== action.payload.square ? action.payload.square : "";

            return {
                ...state,
                global: {
                    ...state.global,
                    selectedSquare: updatedSquare
                }
            };

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
            const updatedSquares = new Set(state.global.highlightedSquares);
            const lastMoveSquares = getLastMoveSquares(state.lines[state.global.currentLineIndex].moveHistory);

            action.payload.squares.map(square => {
                if (updatedSquares.has(square)) {
                    if (lastMoveSquares.from === square || lastMoveSquares.to === square) {
                        return;
                    } else {
                        updatedSquares.delete(square);
                    }
                } else {
                    updatedSquares.add(square);
                }
            });

            return {
                ...state,
                global: {
                    ...state.global,
                    highlightedSquares: Array.from(updatedSquares)
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

        case START_TIMER:
            return { ...state, global: { ...state.global, timerStart: true, timerReset: false } };

        case STOP_TIMER:
            return { ...state, global: { ...state.global, timerStart: false } };

        case SWITCH_LINE:
            return {
                ...state,
                global: {
                    ...state.global,
                    currentLineIndex: action.payload.lineIndex
                }
            }

        case UPDATE_EVALUATION: {
            const updatedLines = state.lines.map((line, index) =>
                index === action.payload.lineIndex ? { ...line, evaluation: action.payload.evaluation } : line
            );
            return { ...state, lines: updatedLines };
        }

        default:
            return state;
    }
};
