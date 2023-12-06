import React, { useEffect, useState } from 'react'
import { useFetchEvaluation } from '../../utility/hooks/useFetchEvaluation'
import { Typography } from '@material-tailwind/react';


const BoardEvaluation: React.FC<{ fen: string, move: string }> = ({ fen, move }) => {
    const fetchEvaluation = useFetchEvaluation();
    const [evaluation, setEvlauation] = useState(0);
    const className = "";

    useEffect(() => {
        const fetchBoardEvaluation = async () => {
            if (fen && move) {
                const { bestMove, centipawns, principalVariation } = await fetchEvaluation.fetchPositionEvaluation(fen, move);
                const turn = fen.split(" ")[1];
                const adjustedCentipawns = turn === 'b' ? -centipawns : centipawns;
                setEvlauation(adjustedCentipawns);
            }
        };

        fetchBoardEvaluation();
    }, [fen, move]);

    return (
        evaluation < 0 ? <Typography variant='h3'>-.{(evaluation * -1)} </Typography> : <Typography variant='h3'>.{evaluation}</Typography>
    );
}

export default BoardEvaluation