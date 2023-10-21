export const CHECK_MOVE_LEGALITY = "CHECK_MOVE_LEGALITY";
export const EXECUTE_PAWN_PROMOTION = "EXECUTE_PAWN_PROMOTION";
export const GET_PIECE_AT_SQUARE = "GET_PIECE_AT_SQUARE";
export const INIT_GAME = "INIT_GAME";
export const INCREMENT_LINE = 'INCREMENT_LINE';
export const MAKE_MOVE = "MAKE_MOVE";
export const MAKE_MOVE_ALT_FORMAT = "MAKE_MOVE_ALT_FORMAT";
export const MAKE_MOVE_WITH_PROMOTION = "MAKE_MOVE_WITH_PROMOTION";
export const SELECT_SQUARE = "SELECT_SQUARE";
export const SET_BOARD_FROM_HISTORY = "SET_BOARD_FROM_HISTORY";
export const SET_IS_COMPUTER_TURN = "SET_IS_COMPUTER_TURN";
export const SET_IS_COMPUTER_READY_TO_MOVE = "SET_IS_COMPUTER_READY_TO_MOVE";
export const SET_CURRENT_LINE_NUMBER = 'SET_CURRENT_LINE_NUMBER';
export const SET_NEXT_MOVE = "SET_NEXT_MOVE";
export const SET_NEXT_MOVES_ARRAY = "SET_NEXT_MOVE_ARRAY";
export const SET_VARIATIONS = "SET_VARIATIONS";
export const SWITCH_LINES = "SWITCH_LINES";
export const UPDATE_MOVE_HISTORIES = "UPDATE_MOVE_HISTORIES";
export const UPDATE_CURRENT_FENS = "UPDATE_CURRENT_FENS";

interface CheckMoveLegalityAction {
    type: typeof CHECK_MOVE_LEGALITY;
    payload: {
        source: string;
        destination: string;
    };
}

interface ExecutePawnPromotionAction {
    type: typeof EXECUTE_PAWN_PROMOTION;
    payload: {
        source: string;
        destination: string;
        promotion: string;
    };
}

interface GetPieceAtSquareAction {
    type: typeof GET_PIECE_AT_SQUARE;
    payload: {
        square: string;
    };
}

interface InitGameAction {
    type: typeof INIT_GAME;
    payload: {
        fen: string;
        currentFens: string[];
        moveHistories: string[][];
        initialMoves: string[];
        nextMoves: string[];
    };
}

interface IncrementLineAction {
    type: typeof INCREMENT_LINE;
}

interface MakeMoveAction {
    type: typeof MAKE_MOVE;
    payload: {
        source: string;
        destination: string;
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

interface SetCurrentLineNumberAction {
    type: typeof SET_CURRENT_LINE_NUMBER;
    payload: { lineNumber: number; };
}

interface SetIsComputerTurnAction {
    type: typeof SET_IS_COMPUTER_TURN;
    payload: { isComputerTurn: boolean; };
}

interface SetIsComputerReady {
    type: typeof SET_IS_COMPUTER_READY_TO_MOVE;
    payload: { isComputerReadyToMove: boolean; };
}

interface SetNextMoveAction {
    type: typeof SET_NEXT_MOVE;
    payload: {
        nextMove: string;
        currentLineIndex: number;
    };
}

interface SetNextMovesArrayAction {
    type: typeof SET_NEXT_MOVES_ARRAY;
    payload: {
        nextMoves: string[];
    };
}

interface SetVariationsAction {
    type: typeof SET_VARIATIONS;
    payload: {
        variations: VariationDTO[];
    };
}

interface SwitchLinesAction {
    type: typeof SWITCH_LINES;
    payload: {
        fen: string;
    };
}

interface UpdateCurrentFensAction {
    type: typeof UPDATE_CURRENT_FENS;
    payload: {
        currentFens: string[];
    };
}

interface UpdateMoveHistoriesAction {
    type: typeof UPDATE_MOVE_HISTORIES;
    payload: {
        moveHistories: string[][];
    };
}


export type GameActionTypes = CheckMoveLegalityAction | ExecutePawnPromotionAction | GetPieceAtSquareAction | IncrementLineAction | InitGameAction |  MakeMoveAction | MakeMoveAltFormatAction | MakeMoveWithPromotionAction | SelectSquareAction | SetBoardFromHistoryAction | SetCurrentLineNumberAction | SetIsComputerReady | SetIsComputerTurnAction | SetNextMoveAction | SetNextMovesArrayAction | SetVariationsAction | SwitchLinesAction | UpdateCurrentFensAction | UpdateMoveHistoriesAction;