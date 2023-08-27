import "./App.scss";
import ButtonsContainer from "./components/containers/buttons-container";
import ChessboardComponent from "./components/chessboard/chessboard";
import Header from "./components/text/header";
import MoveContainer from "./components/containers/move-container";
import Rules from "./components/text/rules";

function App() {
	return (
		<div className="app-container bg-light-500 flex flex-col justify-around items-center h-screen w-screen overflow-hidden">
			<Header></Header>
			<Rules></Rules>
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
}

export default App;
