import { Spinner, Typography } from '@material-tailwind/react';
import React from 'react';


const BoardEvaluation: React.FC<{ centipawns: number, isComputerTurn: boolean }> = ({ centipawns, isComputerTurn }) => {
    // const className = "";
    const adjustedText = centipawns < 0 ? <Typography variant='h3'>-.{(centipawns * -1)} </Typography> : <Typography variant='h3'>.{centipawns}</Typography>

    return (
        <div className='flex flex-row items-center justify-center'>
			{isComputerTurn && <Spinner className="h-8 w-8 p-2 mx-4 text-gray-900/50 inline" />}
            {adjustedText}
        </div>
    );
}

export default React.memo(BoardEvaluation);