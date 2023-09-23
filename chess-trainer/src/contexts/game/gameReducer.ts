import { Chess, Square } from "chess.js";
import { GameState } from "./game-context";
import { GET_PIECE_AT_SQUARE, GameActionTypes, INIT_GAME, MAKE_MOVE, MAKE_MOVE_WITH_PROMOTION, MakeMoveAction, MakeMoveWithPromotionAction, SELECT_SQUARE } from "./gameActions";

const game = new Chess();

export const gameReducer = (state: GameState, action: GameActionTypes): GameState => {
    switch (action.type) {
        case SELECT_SQUARE:
            return {
                ...state,
                selectedSquare: action.payload.square
            };

        case GET_PIECE_AT_SQUARE:
            const { square } = action.payload;
            game.load(state.fen);
            const piece = game.get(square as Square)?.type
            return {
                ...state,
                pieceAtSquare: piece
            };

        case MAKE_MOVE: {
            const payload = action.payload as MakeMoveAction['payload'];
            const { source, destination, currentLineIndex } = payload;

            game.load(state.fen);
            const moveResult = game.move({ from: source, to: destination })

            if (!moveResult) return state;

            const updatedHistory = [...state.moveHistories[currentLineIndex], moveResult.san];
            const updatedHistories = [...state.moveHistories];
            updatedHistories[currentLineIndex] = updatedHistory;

            return {
                ...state,
                fen: game.fen(),
                moveHistories: updatedHistories,
                selectedSquare: null
            };
        }

        case MAKE_MOVE_WITH_PROMOTION: {
            const payload = action.payload as MakeMoveWithPromotionAction['payload'];
            const { source, destination, promotionPiece, currentLineIndex } = payload;

            game.load(state.fen);
            const moveResult = game.move({ from: source, to: destination, promotion: promotionPiece })

            if (!moveResult) return state;

            const updatedHistory = [...state.moveHistories[currentLineIndex], moveResult.san];
            const updatedHistories = [...state.moveHistories];
            updatedHistories[currentLineIndex] = updatedHistory;

            return {
                ...state,
                fen: game.fen(),
                moveHistories: updatedHistories,
                selectedSquare: null
            };
        }

        case INIT_GAME:
            return {
                ...state,
                fen: action.payload.fen
            }
        default:
            return state;
    }
};