import React, { createContext, useContext, useState } from "react";

interface BoardContextProps {
}

interface BoardProviderProps {
  initialFen?: string;
	children: React.ReactNode;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, initialFen }) => {
	const [fen, setFen] = useState(initialFen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

	return <BoardContext.Provider value={{ fen, setFen }}>{children}</BoardContext.Provider>;
};
