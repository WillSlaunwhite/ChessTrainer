import "./App.scss";
import SidebarComponent from "./components/sidebar/sidebar";
import GameViewComponent from "./views/game-view";

function App() {
	return (
		<div className="app-container h-screen w-screen flex flex-column justify-around items-center overflow-hidden">
			<SidebarComponent></SidebarComponent>
			<GameViewComponent></GameViewComponent>
		</div>
	);
}

export default App;
