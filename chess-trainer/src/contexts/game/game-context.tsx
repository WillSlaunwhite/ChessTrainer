import { createContext, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { GameActionTypes } from "./gameActions";


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export interface GameState {
    currentFens: string[];
    moveHistories: string[][];
    fen: string;
    selectedSquare: string | null;
    pieceAtSquare: string;
    colorOfPiece: string;
    lastMoveValid: boolean;
    isPawnPromotion: boolean;
    promotionSource: string;
    promotionDestination: string;
    initialMoves: string[];
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
        currentFens: [startingFen, startingFen, startingFen],
        moveHistories: [[], [], []],
        fen: "",
        selectedSquare: null,
        pieceAtSquare: "",
        colorOfPiece: "",
        lastMoveValid: false,
        isPawnPromotion: false,
        promotionSource: "",
        promotionDestination: "",
        initialMoves: []
    });

    return <GameContext.Provider value={[gameState, dispatch]}>{children}</GameContext.Provider>;
    
};
