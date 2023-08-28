import ChessboardComponent from "../chessboard/chessboard";
import MoveContainer from "./move-container";

const GameContainerComponent = () => {
	return (
		<div className="main-content flex flex-col justify-center items-center h-full w-1/2">
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
		</div>
	);
};

export default GameContainerComponent;
