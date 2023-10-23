import { Chess, Square } from "chess.js";
import { isComputersTurn } from "../../../utility/chessUtils";
import { EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_ALT_FORMAT, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_CURRENT_LINE_NUMBER, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_NEXT_MOVES_ARRAY, SET_VARIATIONS, SWITCH_LINE, SWITCH_LINES, UPDATE_CURRENT_FENS, UPDATE_MOVE_HISTORIES } from "../actions/actionTypes";
import { GameActionTypes } from "../actions/gameActions";
import { GameState } from "../contexts/GameContext";

export const isValidMove = (game: Chess, source: string, destination: string): boolean => {
    const validMoves = game.moves({ square: source as Square, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    switch (action.type) {
        case EXECUTE_PAWN_PROMOTION:
            const { source, destination, promotion } = action.payload;
            const updated
            return {
                ...state,
                lines: 
                fen: game.fen(),
                selectedSquare: null,
                isPawnPromotion: false,
                san: newMove.san
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
            return {
                ...state,
                global: action.payload.global,
                lines: action.payload.lines,
            };

        case MAKE_MOVE: {
            const { fen, san, isPromotion } = action.payload;
            const currentLineIndex = state.global.currentLineIndex;
            const nextLineIndex = currentLineIndex === 2 ? 0 : currentLineIndex + 1;
            const updatedLines = [...state.lines];
            const isComputerTurn = isComputersTurn(updatedLines[nextLineIndex].moveHistory, updatedLines[nextLineIndex].computerColor);

            updatedLines[currentLineIndex] = {
                ...updatedLines[currentLineIndex],
                fen: fen,
                isPawnPromotion: isPromotion,
                moveHistory: [...updatedLines[currentLineIndex].moveHistory, san],
                san: san,
                isComputerTurn: isComputerTurn,
            }
            
            return {
                ...state,
                lines: updatedLines,
                global: {
                    ...state.global,
                    currentLineIndex: nextLineIndex,
                    selectedSquare: null,
                }
            };
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
                global: {
                    ...state.global,
                    selectedSquare: action.payload.square
                }
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
            const lineIndex = action.payload.lineIndex;
            updatedLines[lineIndex] = {
                ...updatedLines[lineIndex],
                fen: action.payload.fen
            }
            return {
                ...state,
                lines: updatedLines
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
