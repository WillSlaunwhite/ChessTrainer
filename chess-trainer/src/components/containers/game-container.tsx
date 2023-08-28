import ChessboardComponent from "../chessboard/chessboard";
import MoveContainer from "./move-container";

const GameContainerComponent = () => {

	return (
		<div className="hidden game-container md:flex flex-col justify-center items-center relative top-1/4 md:top-0 md:left-[20%]">
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
		</div>
	);
};

export default GameContainerComponent;
