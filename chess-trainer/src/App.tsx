import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { GameStateProvider } from "./store/game/contexts/GameContext";
import GameView from "./views/GameView/GameView";
import HomeView from "./views/HomeView";
import { QuizInteractionProvider } from "./store/quiz/quiz-context";
import { DndProvider } from "react-dnd";
import { isTouchDevice } from "./utility/uiUtils";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	return (
		<Router>
			<GameStateProvider>
				<QuizInteractionProvider>
					<DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
						<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
							<Routes>
								<Route path="/" element={<HomeView />} />
								<Route path="/game" element={<GameView />} />
							</Routes>
						</div>
					</DndProvider>
				</QuizInteractionProvider>
			</GameStateProvider>
		</Router>
	);
}

export default App;
