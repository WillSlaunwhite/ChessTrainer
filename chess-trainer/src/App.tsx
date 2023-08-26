import "./App.scss";
import ButtonsContainer from "./components/buttons-container";
import ChessboardComponent from "./components/chessboard";
import Header from "./components/header";
import MoveContainer from "./components/move-container";
import NavButton from "./components/nav-button";
import Rules from "./components/rules";

function App() {
	return (
		<div className="flex flex-col justify-around items-center h-screen w-screen bg-gray-800 overflow-hidden">
			<Header></Header>
			<Rules></Rules>
			<MoveContainer></MoveContainer>
			<ChessboardComponent initialPosition="start" />
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
}

export default App;
