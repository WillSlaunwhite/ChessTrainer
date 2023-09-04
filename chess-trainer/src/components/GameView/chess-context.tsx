import { createContext, useContext, useState } from "react";

interface ChessboardInteractionContextProps {
  selectedSquare: string | null;
  setSelectedSquare: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ChessboardInteractionProviderProps { 
	children: React.ReactNode;
}

const ChessboardInteractionContext = createContext<ChessboardInteractionContextProps | undefined>(undefined);


export const useChessboard = () => {
  console.log("in useChessboard");
  
  const context = useContext(ChessboardInteractionContext);
  if (!context) {
    throw new Error("useBoard must be used within a BoardProvider");
  }
  return context;
};


export const ChessboardInteractionProvider: React.FC<ChessboardInteractionProviderProps> = ({ children }) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  
  return (
    <ChessboardInteractionContext.Provider value={{ selectedSquare, setSelectedSquare }}>
      {children}
    </ChessboardInteractionContext.Provider>
  );
};
