import { createContext, useContext, useState } from "react";


const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

interface GameState {
    currentFens: string[];
    moveHistories: string[][];
    fen: string;
    selectedSquare: string | null;
}

interface GameStateProviderProps {
    children: React.ReactNode;
}

const GameContext = createContext<[GameState, React.Dispatch<React.SetStateAction<GameState>>] | undefined>(undefined);

export const useGameState = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameState must be used within a GameProvider");
    }
    return context;
};


export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
	const [gameState, setGameState] = useState<GameState>({
		currentFens: [startingFen, startingFen, startingFen],
		moveHistories: [[], [], []],
		fen: "",
		selectedSquare: null,
	});

    return <GameContext.Provider value={[gameState, setGameState]}>{children}</GameContext.Provider>;
};
