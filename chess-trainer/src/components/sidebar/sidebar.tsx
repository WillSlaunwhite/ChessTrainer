import { useState } from "react";
import ButtonsContainer from "../containers/buttons-container";
import Header from "../text/header";
import Rules from "../text/rules";
import { Button } from "@material-tailwind/react/components/Button";

const SidebarComponent = () => {
	const [showRules, setShowRules] = useState(false);
	return (
		<div className="sidebar flex flex-col justify-around items-center h-full w-full z-30 relative left-0">
			<Header></Header>
			<div className={`md:block ${showRules ? "block" : "hidden"}`}>
				<Rules></Rules>
			</div>
			<ButtonsContainer></ButtonsContainer>
			<Button className="md:hidden" onClick={() => setShowRules(!showRules)}>
				Toggle Rules
			</Button>
		</div>
	);
};

export default SidebarComponent;
