import { Button } from "@material-tailwind/react/components/Button";
import { useState } from "react";
import GameContainerComponent from "../containers/game-container";
import Rules from "../text/rules";

const SidebarComponent : React.FC<{fen: string; setFen: (fen: string) => void}> = ({ fen, setFen }) =>{
	const [showRules, setShowRules] = useState(false);
	return (
		<div className="sidebar flex flex-col justify-around items-center h-full w-full z-30 relative left-0">
			<div className={`md:block ${showRules ? "block" : "hidden"}`}>
				<Rules></Rules>
			</div>
			<div className="game-container md:hidden absolute bottom-12">
				{!showRules && <GameContainerComponent fen={fen} setFen={setFen}></GameContainerComponent>}
			</div>
			<Button className="md:hidden !absolute bottom-2 px-28" onClick={() => setShowRules(!showRules)}>
				Toggle Rules
			</Button>
		</div>
	);
};

export default SidebarComponent;
