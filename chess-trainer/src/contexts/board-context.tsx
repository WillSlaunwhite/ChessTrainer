import React, { createContext, useContext, useState } from "react";

interface BoardContextProps {
  fen: string;
  setFen: React.Dispatch<React.SetStateAction<string>>;
}

interface BoardProviderProps {
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

export const BoardProvider: React.FC<BoardProviderProps> = ({ children }) => {
	const [fen, setFen] = useState("r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4");

	return <BoardContext.Provider value={{ fen, setFen }}>{children}</BoardContext.Provider>;
};
