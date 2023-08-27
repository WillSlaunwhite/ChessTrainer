import ChessboardComponent from "../components/chessboard/chessboard";
import ButtonsContainer from "../components/containers/buttons-container";
import MoveContainer from "../components/containers/move-container";
import Header from "../components/text/header";
import Rules from "../components/text/rules";
import WelcomeScreenComponent from "./welcome-screen";

const MainViewComponent: React.FC = () => {
	return (
		<div className=" bg-light-500 flex flex-col justify-around items-center h-screen w-screen overflow-hidden tablet:flex-row">
			<Header></Header>
			<Rules></Rules>
			<MoveContainer></MoveContainer>
      <WelcomeScreenComponent></WelcomeScreenComponent>
			<ChessboardComponent initialPosition="start" />
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
};

export default MainViewComponent;