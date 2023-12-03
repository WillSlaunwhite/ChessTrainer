import { GlobalState, LineState } from "../contexts/GameContext";
import { CLEAR_SELECTED_SQUARES, EXECUTE_PAWN_PROMOTION, GET_PIECE_AT_SQUARE, HIGHLIGHT_LAST_MOVES, INCREMENT_LINE, INIT_GAME, MAKE_MOVE, MAKE_MOVE_COMPUTER, SELECT_SQUARE, SET_BOARD_FROM_HISTORY, SET_HIGHLIGHT_SQUARES, SET_IS_COMPUTER_READY_TO_MOVE, SET_IS_COMPUTER_TURN, SET_NEXT_MOVE, SET_VARIATIONS, SWITCH_LINE, UPDATE_FEN_FOR_LINE } from "../types/actionTypes";

interface ClearSelectedSquaresAction {
    type: typeof CLEAR_SELECTED_SQUARES;
}

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

interface HighlightLastMovesAction {
    type: typeof HIGHLIGHT_LAST_MOVES;
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

interface MakeMoveComputerAction {
    type: typeof MAKE_MOVE_COMPUTER;
    payload: {
        fen: string,
        san: string,
        isPromotion: boolean,
        nextMove: string
    }
}

interface SelectSquareAction {
    type: typeof SELECT_SQUARE;
    payload: {
        square: string;
    };
}

interface SetBoardFromHistoryAction {
    type: typeof SET_BOARD_FROM_HISTORY;
}

interface SetHighlightSquaresAction {
    type: typeof SET_HIGHLIGHT_SQUARES;
    payload: {
        squares: string[];
    }
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

export type GameActionTypes = ClearSelectedSquaresAction | ExecutePawnPromotionAction | GetPieceAtSquareAction | HighlightLastMovesAction | IncrementLineAction | InitGameAction | MakeMoveAction | MakeMoveComputerAction | SelectSquareAction | SetBoardFromHistoryAction | SetHighlightSquaresAction | SetIsComputerReady | SetIsComputerTurnAction | SetNextMoveAction | SetVariationsAction | SwitchLineAction | UpdateFenForLineAction;