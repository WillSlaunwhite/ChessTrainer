import { useEffect, useState } from "react";
import { convertToFullMoves } from "../chessUtils";

export function useFetchNextMoves(moveHistories: string[][]): Record<string, number>[] {
    const [fetchedMoves, setFetchedMoves] = useState<Record<string, number>[]>([]);
	const moveHistoriesArray = Object.values(moveHistories);
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
                setFetchedMoves(data);
            }
        };

        fetchNextMoves()
    }, moveHistoriesArray);

    return fetchedMoves;
}