import React from "react";
import OpeningsMenu from "../components/MainMenu/OpeningsMenu";
import WelcomeMessageComponent from "../components/common/text/WelcomeMessage";
import SidebarComponent from "../components/Sidebar/sidebar";

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
