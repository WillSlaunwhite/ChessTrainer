export const SELECT_SQUARE = "SELECT_SQUARE";
export const MAKE_MOVE = "MAKE_MOVE";
export const MAKE_MOVE_WITH_PROMOTION = "MAKE_MOVE_WITH_PROMOTION";
export const INIT_GAME = "INIT_GAME";
export const GET_PIECE_AT_SQUARE = "GET_PIECE_AT_SQUARE";

export interface SelectSquareAction {
    type: typeof SELECT_SQUARE;
    payload: {
        square: string | null;
    };
}

export interface MakeMoveAction {
    type: typeof MAKE_MOVE;
    payload: {
        source: string;
        destination: string;
    };
}

export interface MakeMoveWithPromotionAction {
    type: typeof MAKE_MOVE_WITH_PROMOTION;
    payload: {
        source: string;
        destination: string;
        promotionPiece: string;
    };
}

export interface InitGameAction {
    type: typeof INIT_GAME;
    payload: {
        fen: string;
        moveSequence?: string[];
    };
}

export interface GetPieceAtSquareAction {
    type: typeof GET_PIECE_AT_SQUARE;
    payload: {
        square: string;
    };
}

export type GameActionTypes = SelectSquareAction | MakeMoveAction | InitGameAction | GetPieceAtSquareAction | MakeMoveWithPromotionAction;