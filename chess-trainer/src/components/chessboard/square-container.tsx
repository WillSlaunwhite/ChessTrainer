import { useState } from "react";
import SquarePresentation from "./square-presentation";


interface SquareContainerProps {
  square: string;
  piece: string;
  onMove: (source: string, destination: string) => void;
}

const SquareContainer: React.FC<SquareContainerProps> = ({square, piece, onMove}) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (selected) {
      // logic to move piece
    } else {
      setSelected(true);
    }
  };

  return <SquarePresentation square={square} piece={piece} selected={selected} onClick={handleClick}/>
}

export default SquareContainer;