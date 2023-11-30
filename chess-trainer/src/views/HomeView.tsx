import React from "react";
import WelcomeMessageComponent from "../components/Common/text/WelcomeMessage";
import OpeningsMenu from "../components/MainMenu/OpeningsMenu";
import SidebarComponent from "../components/Sidebar/Sidebar";

const HomeView: React.FC = () => {

	return (
		<div className="home-container w-full h-full flex flex-col bg-gray-300">
			<WelcomeMessageComponent />
			<OpeningsMenu />
			<SidebarComponent />
		</div>
	);
};

export default HomeView;
