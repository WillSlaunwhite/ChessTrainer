import ChessboardComponent from "../chessboard/chessboard";
// import MoveContainer from "./move-container";

const GameContainerComponent: React.FC<{fen: string; setFen: (fen: string) => void}> = ({fen, setFen}) => {
	return (
		<div className="game-container scale-90 flex flex-col justify-center items-center">
			<ChessboardComponent fen={fen} setFen={setFen} />
		</div>
	);
};

export default GameContainerComponent;
