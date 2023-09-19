import { Button } from "@material-tailwind/react/components/Button";
import { useState } from "react";
import Rules from "../common/text/rules";

const SidebarComponent: React.FC = () => {
	const [showRules, setShowRules] = useState(false);
	return (
		<div className="sidebar flex flex-col justify-around items-center h-full w-full z-30 relative left-0">
			<div className={`md:block ${showRules ? "block" : "hidden"}`}>
				<Rules></Rules>
			</div>
			<Button className="md:hidden !absolute bottom-2 px-28" onClick={() => setShowRules(!showRules)}>
				Toggle Rules
			</Button>
		</div>
	);
};

export default SidebarComponent;
