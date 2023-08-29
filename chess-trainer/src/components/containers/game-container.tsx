import ChessboardComponent from "../chessboard/chessboard";
// import MoveContainer from "./move-container";

const GameContainerComponent = () => {
	return (
		<div className="game-container scale-90 flex flex-col justify-center items-center relative bottom-1/3 md:top-0 md:left-[20%]">
			{/* <MoveContainer></MoveContainer> */}
			<ChessboardComponent initialPosition="start" />
		</div>
	);
};

export default GameContainerComponent;
