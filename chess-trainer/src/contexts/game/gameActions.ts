export const CHECK_MOVE_LEGALITY = "CHECK_MOVE_LEGALITY";
export const EXECUTE_PAWN_PROMOTION = "EXECUTE_PAWN_PROMOTION";
export const GET_PIECE_AT_SQUARE = "GET_PIECE_AT_SQUARE";
export const INIT_GAME = "INIT_GAME";
export const MAKE_MOVE = "MAKE_MOVE";
export const MAKE_MOVE_WITH_PROMOTION = "MAKE_MOVE_WITH_PROMOTION";
export const SELECT_SQUARE = "SELECT_SQUARE";
export const SET_BOARD_FROM_ACTION = "SET_BOARD_FROM_ACTION";
export const SET_VARIATIONS = "SET_VARIATIONS";
export const SWITCH_LINES = "SWITCH_LINES";
export const UPDATE_MOVE_HISTORIES = "UPDATE_MOVE_HISTORIES";

export interface CheckMoveLegalityAction {
    type: typeof CHECK_MOVE_LEGALITY;
    payload: {
        source: string;
        destination: string;
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

export interface GetPieceAtSquareAction {
    type: typeof GET_PIECE_AT_SQUARE;
    payload: {
        square: string;
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
export interface SelectSquareAction {
    type: typeof SELECT_SQUARE;
    payload: {
        square: string | null;
    };
}

export interface SetBoardFromHistoryAction {
    type: typeof SET_BOARD_FROM_ACTION;
    payload: {
        moveHistory: string[];
    }
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

export interface UpdateMoveHistories {
    type: typeof UPDATE_MOVE_HISTORIES;
    payload: {
        moveHistories: string[][];
    };
}


export type GameActionTypes = CheckMoveLegalityAction | ExecutePawnPromotionAction | GetPieceAtSquareAction | InitGameAction | MakeMoveAction | MakeMoveWithPromotionAction | SetBoardFromHistoryAction | SetVariationsAction | SwitchLinesAction | SelectSquareAction | UpdateMoveHistories;