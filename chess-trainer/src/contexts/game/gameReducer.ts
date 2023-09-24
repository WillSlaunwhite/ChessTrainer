import { Chess, ChessInstance, Square } from "chess.js";
import { GameState } from "./game-context";
import { CHECK_MOVE_LEGALITY, EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, GameActionTypes, INIT_GAME, MAKE_MOVE, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE } from "./gameActions";

export const isValidMove = (game: ChessInstance, source: string, destination: string): boolean => {
    const validMoves = game.moves({ square: source, verbose: true });
    return validMoves.some(move => move.to === destination);
};

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    let game: ChessInstance;
    if (state.fen) game = new Chess(state.fen); else game = new Chess();

    switch (action.type) {
        case SELECT_SQUARE:
            return {
                ...state,
                selectedSquare: action.payload.square
            };

        case GET_PIECE_AT_SQUARE:
            const { square } = action.payload;
            const color = game.get(square as Square)?.color;
            const piece = game.get(square as Square)?.type;
            return {
                ...state,
                pieceAtSquare: piece,
                colorOfPiece: color
            };

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
                    game.move({ from: source, to: destination });
                    return {
                        ...state,
                        fen: game.fen(),
                        selectedSquare: null
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
            const { source, destination, promotion} = action.payload;
            game.move({ from: source, to: destination, promotion: promotion});
            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null,
                isPawnPromotion: false
            };
        }

        case MAKE_MOVE: {
            const { source, destination } = action.payload;
            game.load(state.fen);

            const moveResult = game.move({ from: source, to: destination });
            const wasMoveValid = !!moveResult;

            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null,
                lastMoveValid: wasMoveValid,
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
                selectedSquare: null
            };
        }

        case INIT_GAME:
            game.load(action.payload.fen);
            console.log("*********INITIAL MOVE SEQUENCE: ", action.payload.moveSequence);
            
            return {
                ...state,
                fen: action.payload.fen,
                initialMoves: action.payload.moveSequence
            };

        default:
            return state;
    }
};