import "./App.scss";
import ChessboardComponent from "./chessboard/chessboard";

function App() {
	return (
		<div className="flex justify-center items-center h-screen w-screen bg-gray-800">
			<ChessboardComponent initialPosition="start" />
		</div>
	);
}

export default App;
