import React, { useEffect, useRef } from 'react';
import Move from './Move';

interface MoveHistoryProps {
  moveHistory: string[];
  isActive: boolean;
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moveHistory, isActive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
	const activeStyle = !isActive ? "text-gray-400 font-thin" : "";

  useEffect(() => {
    const container = containerRef.current;
    if (container) { container.scrollTop = container.scrollHeight; }
  }, [moveHistory]);

  return (
    <div ref={containerRef} className='move-history tracking-wide text-center w-full h-28 max-h-96 overflow-y-scroll'>
      {moveHistory.map((fullMove, index) => {
        const [whiteMove, blackMove] = fullMove.split(' ');

        return (
          <div className='w-full text-left flex align-middle fade-enter' key={index}>
            <span className={`${activeStyle} pl-1`}>{index + 1}. </span>
            <Move move={whiteMove} isRecent={index === moveHistory.length - 1} isActive={isActive} />
            {blackMove && <span className={`mx-auto ${activeStyle}`}> - </span>}
            {blackMove && <Move move={blackMove} isRecent={index + 1 === moveHistory.length} isActive={isActive} />}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(MoveHistory);