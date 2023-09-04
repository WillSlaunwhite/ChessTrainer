import { useRef, useState } from "react";
import "./App.scss";
import GameView from "./components/GameView/game-view";
import HomeView from "./views/home-view";
import { Chess } from "chess.js";
import { BoardProvider } from "./components/GameView/board-context";

function App() {
	const [isQuizActive, setIsQuizActive] = useState(false);
	const chess = useRef(new Chess());
	console.log("app");

	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			<BoardProvider>
				{!isQuizActive ? (
					<HomeView setIsQuizActive={setIsQuizActive}></HomeView>
				) : (
					<GameView chess={chess.current} setIsQuizActive={setIsQuizActive}></GameView>
				)}
			</BoardProvider>
		</div>
	);
}

export default App;
