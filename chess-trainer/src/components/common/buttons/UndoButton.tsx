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
            <Button onClick={() => undoMove.handleUndoMove(moveHistory)} variant="filled" className='min-w-full min-h-full p-0 flex items-center justify-around'>
                <ArrowUturnLeftIcon className='h-12 w-8 text-blue-500 ml-3 py-1 mb-1'></ArrowUturnLeftIcon>
                <Typography color="light-blue" variant="h3" className='mr-8'>
                    Undo Move
                </Typography>
            </Button>
        </div>
    )
}

export default UndoButton