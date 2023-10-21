import { createContext, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { GameActionTypes } from "./gameActions";


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

interface GlobalState {
	currentLineIndex: number;
    initialMoves: string[];
    selectedSquare: string | null;
    variations: VariationDTO[];
}

interface LineState {
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

type GameState = {
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
