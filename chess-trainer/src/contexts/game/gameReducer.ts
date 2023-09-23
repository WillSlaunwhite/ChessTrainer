import { Chess, Square } from "chess.js";
import { GameState } from "./game-context";
import { GET_PIECE_AT_SQUARE, GameActionTypes, INIT_GAME, MAKE_MOVE, MAKE_MOVE_WITH_PROMOTION, MakeMoveAction, MakeMoveWithPromotionAction, SELECT_SQUARE } from "./gameActions";
import { ChessInstance } from "chess.js";


export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    console.log("STATE FIRST INIT FEN: ", state.fen)
    
    let game: ChessInstance;
    if (state.fen) game = new Chess(state.fen); else game = new Chess();

    switch (action.type) {
        case SELECT_SQUARE:
            console.log("IN SELECT SQUARE");
            
            return {
                ...state,
                selectedSquare: action.payload.square
            };

        case GET_PIECE_AT_SQUARE:
            const { square } = action.payload;
            // game.load(game.fen());
            const piece = game.get(square as Square)?.type
            return {
                ...state,
                pieceAtSquare: piece
            };

        case MAKE_MOVE: {
            const payload = action.payload as MakeMoveAction['payload'];
            const { source, destination } = payload;

            console.log("IN MAKE MOVE GAME: ", game.fen());
            console.log("IN MAKE MOVE: ", state.fen);

            game.load(state.fen);

            const validMoves = game.moves({ square: source, verbose: true});

            const isValidMove = validMoves.some(move => move.to === destination);

            if (!isValidMove) {
                return {
                    ...state,
                    selectedSquare: null
                }
            }
            
            game.move({ from: source, to: destination });

            console.log("IN MAKE MOVE GAME AFTER: ", game.fen());
            console.log("IN MAKE MOVE AFTER: ", state.fen);


            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null,
            };
        }

        case MAKE_MOVE_WITH_PROMOTION: {
            const payload = action.payload as MakeMoveWithPromotionAction['payload'];
            const { source, destination, promotionPiece } = payload;

            game.load(game.fen());
            const moveResult = game.move({ from: source, to: destination, promotion: promotionPiece })

            if (!moveResult) return state;


            return {
                ...state,
                fen: game.fen(),
                selectedSquare: null
            };
        }

        case INIT_GAME:
            console.log("IN INITTT GAMMMEEE: ", action.payload.fen);
            
            game.load(action.payload.fen);
            return {
                ...state,
                fen: action.payload.fen
            }
        default:
            return state;
    }
};