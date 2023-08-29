import { useState } from "react";
import "./App.scss";
import GameContainerComponent from "./components/containers/game-container";
import WelcomeScreenComponent from "./views/welcome-screen";




function App() {
	const [fen, setFen] = useState("r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4");
	
	return (
		<div className="app-container h-screen w-screen bg-blue-gray-50 flex flex-column justify-center items-center overflow-hidden">
			<WelcomeScreenComponent fen={fen} setFen={setFen}></WelcomeScreenComponent>
			<div className="game-container-comp hidden md:block absolute right-[15%]">
				<GameContainerComponent fen={fen} setFen={setFen}></GameContainerComponent>
			</div>
		</div>
	);
}

export default App;
