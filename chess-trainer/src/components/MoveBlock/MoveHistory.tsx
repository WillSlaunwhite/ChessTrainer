import React, { useEffect, useRef } from 'react';
import Move from './move';

interface MoveHistoryProps {
  moveHistory: string[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [moveHistory]);

  return (
    <div ref={containerRef} className='move-history tracking-wide text-center w-full h-28 max-h-96 overflow-y-scroll'>
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

export default React.memo(MoveHistory);