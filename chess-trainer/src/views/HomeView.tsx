import React from "react";
import WelcomeMessageComponent from "../components/Common/text/welcome-message";
import OpeningsMenu from "../components/MainMenu/OpeningsMenu";
import SidebarComponent from "../components/Sidebar/sidebar";

const HomeView: React.FC = () => {

	return (
		<div className="home-container w-full h-full flex flex-col">
			<WelcomeMessageComponent />
				<OpeningsMenu/>
			<SidebarComponent />
		</div>
	);
};

export default HomeView;
