import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { useUndoMove } from '../../../utility/hooks/useUndoMove'
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

interface UndoButtonProps {
    moveHistory: string[];
}

const UndoButton: React.FC<UndoButtonProps> = ({ moveHistory }) => {
    const undoMove = useUndoMove();
    return (
        <div className='w-3/4 h-1/2 p-2'>
            <Button onClick={() => undoMove.handleUndoMove(moveHistory)} variant="filled" className='w-full h-4/5 p-2 py-4 flex items-center justify-around'>
                <ArrowUturnLeftIcon className='h-8 w-12 text-white py-1 mb-1'></ArrowUturnLeftIcon>
                <Typography color="white" variant="h3" className='w-4/5 text-center mr-4'>
                    Undo Move
                </Typography>
            </Button>
        </div>
    )
}

export default UndoButton