export const SELECT_SQUARE = "SELECT_SQUARE";
export const MAKE_MOVE = "MAKE_MOVE";
export const MAKE_MOVE_WITH_PROMOTION = "MAKE_MOVE_WITH_PROMOTION";
export const INIT_GAME = "INIT_GAME";
export const GET_PIECE_AT_SQUARE = "GET_PIECE_AT_SQUARE";
export const CHECK_MOVE_LEGALITY = "CHECK_MOVE_LEGALITY";
export const EXECUTE_PAWN_PROMOTION = "EXECUTE_PAWN_PROMOTION";
export const SET_VARIATIONS = "SET_VARIATIONS";
export const SET_MOVE_HISTORIES = "SET_MOVE_HISTORIES";
export const SWITCH_LINES = "SWITCH_LINES";

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
        currentFens: string[];
        moveHistories: string[][];
    };
}

export interface GetPieceAtSquareAction {
    type: typeof GET_PIECE_AT_SQUARE;
    payload: {
        square: string;
    };
}

export interface ExecutePawnPromotionAction {
    type: typeof EXECUTE_PAWN_PROMOTION;
    payload: {
        source: string;
        destination: string;
        promotion: string;
    };
}

export interface CheckMoveLegalityAction {
    type: typeof CHECK_MOVE_LEGALITY;
    payload: {
        source: string;
        destination: string;
    };
}

export interface SetMoveHistories {
    type: typeof SET_MOVE_HISTORIES;
    payload: {
        histories: [[]];
    };
}

export interface SetVariationsAction {
    type: typeof SET_VARIATIONS;
    payload: {
        variations: VariationDTO[];
    };
}

export interface SwitchLinesAction {
    type: typeof SWITCH_LINES;
    payload: {
        fen: string;
    };
}

export type GameActionTypes = SelectSquareAction | MakeMoveAction | InitGameAction | GetPieceAtSquareAction | MakeMoveWithPromotionAction | CheckMoveLegalityAction | ExecutePawnPromotionAction | SetVariationsAction | SetMoveHistories | SwitchLinesAction;