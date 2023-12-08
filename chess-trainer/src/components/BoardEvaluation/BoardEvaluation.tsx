import { Typography } from '@material-tailwind/react';
import React from 'react';


const BoardEvaluation: React.FC<{ centipawns: number }> = ({ centipawns }) => {
    // const className = "";

    return (
        centipawns < 0 ? <Typography variant='h3'>-.{(centipawns * -1)} </Typography> : <Typography variant='h3'>.{centipawns}</Typography>
    );
}

export default React.memo(BoardEvaluation);