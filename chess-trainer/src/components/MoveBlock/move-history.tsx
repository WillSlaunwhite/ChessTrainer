import React from 'react';
import Move from './move';

interface MoveHistoryProps {
  moveHistory: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {

  return (
    <div className='move-history tracking-wide text-center w-full'>
      {moveHistory.map((move, index, moves) => {
        const isRecent: boolean = index === moveHistory.length - 1;
        const moveNumber = Math.floor(index / 2) + 1;

        if (index % 2 === 0) {
          const whiteMove = move;
          const blackMove = moves[index + 1] || ""; // in case there isn't a black move
          
          return (
            <div className='w-full text-left flex align-middle fade-enter' key={index}>
              <span className='pl-1'>{moveNumber}. </span>
              <Move move={whiteMove} isRecent={isRecent} />
              {blackMove && <span className='mx-auto'> - </span>}
              {blackMove && <Move move={blackMove} isRecent={(isRecent && blackMove != "")} />}
            </div>
          );
        }
        // If it's an odd index, skip rendering as it's handled in the even index.
        return null;
      }).filter(Boolean)}
    </div>
  );
};

export default React.memo(MoveHistory);