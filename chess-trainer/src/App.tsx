import "./App.scss";
import ChessboardComponent from "./components/chessboard";
import Header from "./components/header";

function App() {
	return (
		<div className="flex flex-col justify-around items-center h-screen w-screen bg-gray-800">
			<Header></Header>
			<ChessboardComponent initialPosition="start" />
		</div>
	);
}

export default App;
