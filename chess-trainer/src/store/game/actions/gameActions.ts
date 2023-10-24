import { GlobalState, LineState } from "../contexts/GameContext";
import { EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_ALT_FORMAT, MAKE_MOVE_WITH_PROMOTION, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_VARIATIONS, SWITCH_LINE, UPDATE_FEN_FOR_LINE } from "./actionTypes";

interface ExecutePawnPromotionAction {
    type: typeof EXECUTE_PAWN_PROMOTION;
    payload: {
        destination: string;
        lineNumber: number;
        promotion: string;
        source: string;
    };
}

interface GetPieceAtSquareAction {
    type: typeof GET_PIECE_AT_SQUARE;
    payload: {
        square: string;
        lineNumber: number;
    };
}

interface InitGameAction {
    type: typeof INIT_GAME;
    payload: {
        global: GlobalState,
        lines: LineState[]
    };
}

interface IncrementLineAction {
    type: typeof INCREMENT_LINE;
}

interface MakeMoveAction {
    type: typeof MAKE_MOVE;
    payload: {
        fen: string,
        san: string,
        isPromotion: boolean
    };
}

interface MakeMoveAltFormatAction {
    type: typeof MAKE_MOVE_ALT_FORMAT;
    payload: {
        move: string;
    }
}

interface MakeMoveWithPromotionAction {
    type: typeof MAKE_MOVE_WITH_PROMOTION;
    payload: {
        source: string;
        destination: string;
        promotionPiece: string;
    };
}
interface SelectSquareAction {
    type: typeof SELECT_SQUARE;
    payload: {
        square: string | null;
    };
}

interface SetBoardFromHistoryAction {
    type: typeof SET_BOARD_FROM_HISTORY;
}

interface SetIsComputerTurnAction {
    type: typeof SET_IS_COMPUTER_TURN;
    payload: {
        isComputerTurn: boolean;
        currentLineIndex: number;
    };
}

interface SetIsComputerReady {
    type: typeof SET_IS_COMPUTER_READY_TO_MOVE;
    payload: { 
        isComputerReadyToMove: boolean;
        currentLineIndex: number;
    };
}

interface SetNextMoveAction {
    type: typeof SET_NEXT_MOVE;
    payload: {
        nextMove: string;
        currentLineIndex: number;
    };
}

interface SetVariationsAction {
    type: typeof SET_VARIATIONS;
    payload: {
        variations: VariationDTO[];
    };
}

interface SwitchLineAction {
    type: typeof SWITCH_LINE;
    payload: {
        lineIndex: number;
    };
}

interface UpdateFenForLineAction {
    type: typeof UPDATE_FEN_FOR_LINE;
    payload: {
        lineIndex: number,
        fen: string;
    };
}

export type GameActionTypes = ExecutePawnPromotionAction | GetPieceAtSquareAction | IncrementLineAction | InitGameAction | MakeMoveAction | MakeMoveAltFormatAction | MakeMoveWithPromotionAction | SelectSquareAction | SetBoardFromHistoryAction | SetIsComputerReady | SetIsComputerTurnAction | SetNextMoveAction | SetVariationsAction | SwitchLineAction | UpdateFenForLineAction;