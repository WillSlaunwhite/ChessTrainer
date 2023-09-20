import { createContext, useContext, useState } from "react";


interface HistoryContextProps {
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

export const HistoryProvider: React.FC<HistoryProviderProps> = ({ children }) => {
	const [moveHistories, setMoveHistories] = useState<string[][]>([[], [], []]);

	return <HistoryContext.Provider value={{ moveHistories, setMoveHistories }}>{children}</HistoryContext.Provider>;
};
