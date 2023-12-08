import { Button } from '@material-tailwind/react'
import React from 'react'
import { useUndoMove } from '../../../utility/hooks/useUndoMove'

interface UndoButtonProps {
    moveHistory: string[];
}

const UndoButton: React.FC<UndoButtonProps> = ({ moveHistory }) => {
    const undoMove = useUndoMove();
    return (
		<Button onClick={(_event) => undoMove.handleUndoMove(moveHistory)} variant="outlined" className="undo-button border-green-900 border-2 text-gray-600 focus:text-gray-400 focus:bg-blue-700 hover:text-gray-400 px-12 text-3xl font-sans font-normal tracking-wider py-7 rounded  hover:bg-blue-700 flex items-center">Undo Move</Button>
    )
}

export default UndoButton