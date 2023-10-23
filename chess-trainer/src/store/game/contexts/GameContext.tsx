import React, { createContext, useContext, useReducer } from "react";
import { gameReducer } from "../reducers/gameReducer";
import { GameActionTypes } from "../actions/gameActions";


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export interface GlobalState {
    currentLineIndex: number;
    initialMoves: string[];
    selectedSquare: string | null;
    variations: VariationDTO[];
}

export interface LineState {
    colorOfPiece: string;
    computerColor: 'white' | 'black';
    fen: string;
    isComputerTurn: boolean,
    isComputerReadyToMove: boolean,
    isPawnPromotion: boolean;
    lastMoveValid: boolean;
    moveHistory: string[];
    nextMove: string;
    pieceAtSquare: string;
    promotionDestination: string;
    promotionSource: string;
    san: string;
}

export type GameState = {
    global: GlobalState;
    lines: LineState[];
}

interface GameStateProviderProps {
    children: React.ReactNode;
}

const GameContext = createContext<[GameState, React.Dispatch<GameActionTypes>] | undefined>(undefined);

export const useGameState = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameState must be used within a GameProvider");
    }
    return context;
};


export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
    const [gameState, dispatch] = useReducer(gameReducer, {
        global: {
            currentLineIndex: 0,
            initialMoves: [],
            selectedSquare: null,
            variations: []
        },
        lines: [
            {
                colorOfPiece: "",
                computerColor: "black",
                fen: startingFen,
                isComputerTurn: false,
                isComputerReadyToMove: false,
                isPawnPromotion: false,
                lastMoveValid: false,
                moveHistory: [],
                nextMove: "",
                pieceAtSquare: "",
                promotionDestination: "",
                promotionSource: "",
                san: "",
            }
        ]
    });

    return <GameContext.Provider value={[gameState, dispatch]}>{children}</GameContext.Provider>;
};
