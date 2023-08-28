import ChessboardComponent from "../components/chessboard/chessboard";
import MoveContainer from "../components/containers/move-container";

const GameViewComponent: React.FC = () => {
	return (
		<div className=" bg-light-500 flex flex-col justify-center items-center h-full w-1/2 overflow-hidden">
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
		</div>
	);
};

export default GameViewComponent;