import ChessboardComponent from "../chessboard/chessboard";
// import MoveContainer from "./move-container";

const GameContainerComponent: React.FC<{ onMove: (move: string) => void; fen: string; setFen: (fen: string) => void }> = ({ onMove, fen, setFen }) => {
	return (
		<div className="game-container scale-90 flex flex-col justify-center items-center">
			<ChessboardComponent fen={fen} setFen={setFen} onMove={onMove}/>
		</div>
	);
};

export default GameContainerComponent;
