import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { GameStateProvider } from "./contexts/game/game-context";
import { useQuiz } from "./contexts/quiz/quiz-context";
import GameView from "./views/GameView/game-view";
import HomeView from "./views/home-view";

function App() {
	const [quizState] = useQuiz();
	console.log("app");

	return (
		<Router>
			<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
				<GameStateProvider>
					<Routes>
						<Route path="/" element={<HomeView/>}/>
						<Route path="/game" element={<GameView/>}/>
					</Routes>
				</GameStateProvider>
			</div>
		</Router>
	);
}

export default App;
