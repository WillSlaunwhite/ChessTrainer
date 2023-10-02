// import { createContext } from "react";

// export interface BoardState {
//     colorOfPiece: string;
//     isPawnPromotion: boolean;
//     pieceAtSquare: string;
//     promotionDestination: string;
//     promotionSource: string;
//     selectedSquare: string | null;
// }

// interface BoardStateProviderProps {
//     children: React.ReactNode;
// }

// const BoardContext = createContext<[BoardState, React.Dispatch<BoardActionTypes>] | undefined>(undefined);

// export const useGameState = () => {
//     const context = useContext(GameContext);
//     if (!context) {
//         throw new Error("useGameState must be used within a GameProvider");
//     }
//     return context;
// };

// export type BoardActionTypes = CheckMoveLegalityAction | ExecutePawnPromotionAction | GetPieceAtSquareAction | InitGameAction | MakeMoveAction | MakeMoveWithPromotionAction | SetBoardFromHistoryAction | SetNextMoveAction | SetVariationsAction | SwitchLinesAction | SelectSquareAction | UpdateMoveHistories;