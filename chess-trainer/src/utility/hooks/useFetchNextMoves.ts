import { useEffect } from "react";
import { convertToFullMoves } from "../chessUtils";

export function useFetchNextMoves(moveHistoriesArray: string[][]) {
    useEffect(() => {
        const fetchNextMoves = async () => {
            const allFullMoves = moveHistoriesArray.map(convertToFullMoves);
            const response = await fetch('http://localhost:8085/api/chess/next-moves', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(allFullMoves)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("DATA: ", data);
            }
        };

        fetchNextMoves()
    }, moveHistoriesArray);
}