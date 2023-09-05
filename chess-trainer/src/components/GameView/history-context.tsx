import { createContext, useContext, useState } from "react";

interface Move {
	from: string;
	to: string;
}

interface HistoryContextProps {
	moveHistory: Move[];
	setMoveHistory: (moveHistory: Move[]) => void;
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
	const [moveHistory, setMoveHistory] = useState<Move[]>([]);

	return <HistoryContext.Provider value={{ moveHistory, setMoveHistory }}>{children}</HistoryContext.Provider>;
};
