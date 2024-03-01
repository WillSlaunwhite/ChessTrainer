import React from "react";
import OpeningsMenu from "../components/MainMenu/OpeningsMenu";
import WelcomeMessageComponent from "../components/common/text/WelcomeMessage";
import SidebarComponent from "../components/Sidebar/sidebar";
import { Link } from "react-router-dom";

const HomeView: React.FC = () => {

	return (
		<div className="home-container w-full h-full flex flex-col bg-gray-300">
			// Add this test link in your render method to see if manual navigation works
			<Link to="/game">Go to Game View</Link>

			<WelcomeMessageComponent />
			<OpeningsMenu />
			<SidebarComponent />
		</div>
	);
};

export default HomeView;
