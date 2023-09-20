import { createContext, useContext, useState } from "react";


interface HistoryContextProps {
	currentFens: string[];
	setCurrentFens: (currentFens: string[]) => void;
	moveHistories: string[][];
	setMoveHistories: (moveHistory: string[][]) => void;
}

interface HistoryProviderProps {
	children: React.ReactNode;
}

const HistoryContext = createContext<HistoryContextProps | undefined>(undefined);

export const useHistory = () => {
	const context = useContext(HistoryContext);
	if (!context) {
		throw new Error("useHistory must be used within a HistoryProvider");
	}
	return context;
};

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
	const [moveHistories, setMoveHistories] = useState<string[][]>(Array(3).fill([]));
	const [currentFens, setCurrentFens] = useState<string[]>(Array(3).fill(startingFen));

	return <HistoryContext.Provider value={{ moveHistories, setMoveHistories, currentFens, setCurrentFens }}>{children}</HistoryContext.Provider>;
};
