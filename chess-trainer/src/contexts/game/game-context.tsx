import { createContext, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { GameActionTypes } from "./gameActions";


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export interface GameState {
    colorOfPiece: string;
    computerColor: 'white' | 'black';
    currentFens: string[];
	currentLineIndex: number;
    fen: string;
    initialMoves: string[];
    isComputerTurn: boolean,
    isComputerReadyToMove: boolean,
    isPawnPromotion: boolean;
    lastMoveValid: boolean;
    moveHistories: string[][];
    nextMoves: string[],
    pieceAtSquare: string;
    promotionDestination: string;
    promotionSource: string;
    san: string;
    selectedSquare: string | null;
    variations: VariationDTO[];
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
        colorOfPiece: "",
        computerColor: "black",
		currentLineIndex: 0,
        currentFens: [startingFen, startingFen, startingFen],
        fen: "",
        initialMoves: [],
        isComputerTurn: false,
        isComputerReadyToMove: false,
        isPawnPromotion: false,
        lastMoveValid: false,
        moveHistories: [[], [], []],
        nextMoves: [],
        pieceAtSquare: "",
        promotionDestination: "",
        promotionSource: "",
        san: "",
        selectedSquare: null,
        variations: [],
    });

    return <GameContext.Provider value={[gameState, dispatch]}>{children}</GameContext.Provider>;
    
};
