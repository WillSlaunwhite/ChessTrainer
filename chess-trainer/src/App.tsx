import "./App.scss";
import ButtonsContainer from "./components/containers/buttons-container";
import ChessboardComponent from "./components/chessboard/chessboard";
import Header from "./components/text/header";
import MatButton from "./components/buttons/mat-button";
import MoveContainer from "./components/containers/move-container";
import Rules from "./components/text/rules";

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
