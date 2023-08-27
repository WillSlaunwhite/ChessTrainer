import "./App.scss";
import ButtonsContainer from "./components/buttons-container";
import ChessboardComponent from "./components/chessboard";
import Header from "./components/header";
import MatButton from "./components/mat-button";
import MoveContainer from "./components/move-container";
import Rules from "./components/rules";

function App() {
	return (
		<div className="app-container  flex flex-col justify-around items-center h-screen w-screen overflow-hidden">
			<Header></Header>
			<Rules></Rules>
			<MoveContainer></MoveContainer>
			<MatButton></MatButton>
			<ChessboardComponent initialPosition="start" />
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
}

export default App;
