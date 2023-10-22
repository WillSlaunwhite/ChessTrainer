import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { GameStateProvider } from "./store/game/contexts/GameContext";
import GameView from "./views/GameView/game-view";
import HomeView from "./views/home-view";
import { QuizInteractionProvider } from "./store/quiz/quiz-context";

function App() {
	return (
		<Router>
			<GameStateProvider>
				<QuizInteractionProvider>
					<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
						<Routes>
							<Route path="/" element={<HomeView />} />
							<Route path="/game" element={<GameView />} />
						</Routes>
					</div>
				</QuizInteractionProvider>
			</GameStateProvider>
		</Router>
	);
}

export default App;
