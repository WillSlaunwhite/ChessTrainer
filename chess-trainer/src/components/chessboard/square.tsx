interface SquareProps {
  position: string;
  color: 'light' | 'dark';
  piece?: string;
  onSelect: (position: string) => void
  isSelected: boolean;
}

const Square: React.FC<SquareProps> = ({position, color, piece, onSelect, isSelected}) {
  return 
}