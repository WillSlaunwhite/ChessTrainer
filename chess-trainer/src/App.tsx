import { useState } from "react";
import "./App.scss";
import GameView from "./views/GameView/game-view";
import { BoardProvider } from "./contexts/board-context";
import HomeView from "./views/home-view";

function App() {
	const [isQuizActive, setIsQuizActive] = useState(false);
	console.log("app");

	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			<BoardProvider>
				{!isQuizActive ? (
					<HomeView setIsQuizActive={setIsQuizActive}></HomeView>
				) : (
					<GameView setIsQuizActive={setIsQuizActive}></GameView>
				)}
			</BoardProvider>
		</div>
	);
}

export default App;
