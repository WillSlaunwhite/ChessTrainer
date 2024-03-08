import React from "react";
import OpeningsMenu from "../components/MainMenu/OpeningsMenu";
import SidebarComponent from "../components/Sidebar/sidebar";
import WelcomeMessageComponent from "../components/common/text/WelcomeMessage";

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
