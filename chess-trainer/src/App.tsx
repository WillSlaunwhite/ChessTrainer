import "./App.scss";
import { GameStateProvider } from "./contexts/game/game-context";
import { useQuiz } from "./contexts/quiz/quiz-context";
import GameView from "./views/GameView/game-view";
import HomeView from "./views/home-view";

function App() {
	const [quizState, setQuizState] = useQuiz();
	console.log("app");

	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			<GameStateProvider>
				{!quizState.isActive ? (
					<HomeView></HomeView>
				) : (
					<GameView></GameView>
				)}
			</GameStateProvider>
		</div>
	);
}

export default App;
