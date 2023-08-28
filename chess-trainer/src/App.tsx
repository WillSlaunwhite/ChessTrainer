import "./App.scss";
import GameContainerComponent from "./components/containers/game-container";
import WelcomeScreenComponent from "./views/welcome-screen";

function App() {
	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			<WelcomeScreenComponent></WelcomeScreenComponent>
			<GameContainerComponent></GameContainerComponent>
		</div>
	);
}

export default App;
