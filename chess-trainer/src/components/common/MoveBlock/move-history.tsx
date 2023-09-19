import React from 'react';
import Move from './move';

interface MoveHistoryProps {
  moveHistory: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  return (
    <div className='move-history tracking-wide text-center'>
      {moveHistory.map((move, index) => (
        <Move key={index} move={move}/>
      ))}
    </div>
  );
};

export default MoveHistory;