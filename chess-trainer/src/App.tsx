import { useState } from "react";
import "./App.scss";
import GameView from "./components/GameView/game-view";
import HomeView from "./views/home-view";

function App() {
	const [fen, setFen] = useState("r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4");
	const [isQuizActive, setIsQuizActive] = useState(false);


	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			{!isQuizActive ? (
				<HomeView setFen={setFen} setIsQuizActive={setIsQuizActive}></HomeView>
			) : (
				<GameView fen={fen} setFen={setFen} setIsQuizActive={setIsQuizActive}></GameView>
			)}
		</div>
	);
}

export default App;
