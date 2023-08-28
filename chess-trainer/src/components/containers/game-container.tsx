import ChessboardComponent from "../chessboard/chessboard";
import MoveContainer from "./move-container";

const GameContainerComponent = () => {
	return (
  <div className="game-container flex flex-col justify-center items-center relative top-[20%]">
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
		</div>
	);
};

export default GameContainerComponent;
