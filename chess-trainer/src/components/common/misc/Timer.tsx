import { Progress, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

interface TimerProps {
    initialTime: number;
    start: boolean;
    reset: boolean;
}

const Timer: React.FC<TimerProps> = ({ initialTime, start, reset }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    console.log(start + " " + reset);
    
    useEffect(() => {
        let intervalId: number;
        if (start) {
            intervalId = setInterval(() => {
                setTimeLeft((time) => {
                    const newTime = time - .1;
                    return newTime > 0 ? parseFloat(newTime.toFixed(2)) : 0;
                });
            }, 100);
        }
        return () => { if (intervalId) clearInterval(intervalId); }
    }, [start]);

    useEffect(() => {
        if (reset) {
            setTimeLeft(initialTime);
        }
    }, [reset, initialTime]);

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

export default React.memo(Timer);