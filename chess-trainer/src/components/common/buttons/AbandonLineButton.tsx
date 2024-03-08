import { XMarkIcon } from '@heroicons/react/24/solid';
import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { useAbandonLine } from '../../../utility/hooks/useAbandonLine';

const AbandonLineButton: React.FC<{lineNumber: number}> = ({lineNumber}) => {
    const abandonLine = useAbandonLine();
    return (
        <div className='w-3/4 h-1/2 p-2'>
            <Button onClick={() => abandonLine.abandonLine(lineNumber)} variant="filled" className='w-full h-4/5 p-2 py-4 flex items-center justify-around'>
                <XMarkIcon className='h-12 w-8 text-white ml-3 py-1'/>
                <Typography color="white" variant="h3" className='mr-2 w-4/5'>
                    Abandon
                </Typography>
            </Button>
        </div>
    )
}

export default AbandonLineButton