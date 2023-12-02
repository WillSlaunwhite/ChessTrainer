import { Progress, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'

interface TimerProps {
    initialTime: number
}

const Timer: React.FC<TimerProps> = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft((time) => time > 0 ? time - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }), [initialTime];

    return (
        <div className="w-full">
            <div className="mb-2 p-2 flex items-center justify-between gap-4">
                <Typography color="blue-gray" variant="h6">
                    Time Left
                </Typography>
                <Typography color="blue-gray" variant="h6">
                    {timeLeft}s
                </Typography>
            </div>
            <Progress className='w-11/12 mx-auto' variant='gradient' size='lg' color='green' value={(timeLeft / initialTime) * 100} />
        </div>
    )
}

export default Timer