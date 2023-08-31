import React from "react";
import WelcomeMessageComponent from "../components/text/welcome-message";
import OpeningsMenu from "../components/containers/openings-menu";
import SidebarComponent from "../components/sidebar/sidebar";

const HomeView: React.FC<{ setFen: (fen: string) => void; setIsQuizActive: (isActive: boolean) => void }> = ({ setFen, setIsQuizActive}) => {
	return (
		<div className="home-container w-full h-full flex flex-col">
			<WelcomeMessageComponent />
			<OpeningsMenu setFen={setFen} setIsQuizActive={setIsQuizActive}/>
			<SidebarComponent />
		</div>
	);
};

export default HomeView;
