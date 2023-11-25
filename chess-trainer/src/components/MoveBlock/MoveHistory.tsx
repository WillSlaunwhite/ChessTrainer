import React from 'react';
import Move from './Move';

interface MoveHistoryProps {
  moveHistory: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  return (
    <div className='move-history tracking-wide text-center w-full'>
      {moveHistory.map((fullMove, index) => {
        const [whiteMove, blackMove] = fullMove.split(' ');

        return (
          <div className='w-full text-left flex align-middle fade-enter' key={index}>
            <span className='pl-1'>{index + 1}. </span>
            <Move move={whiteMove} isRecent={index === moveHistory.length - 1} />
            {blackMove && <span className='mx-auto'> - </span>}
            {blackMove && <Move move={blackMove} isRecent={index + 1 === moveHistory.length} />}
          </div>
        );
      })}
    </div>
  );
};

export default MoveHistory;