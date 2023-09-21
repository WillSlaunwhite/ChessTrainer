import React from "react";
import WelcomeMessageComponent from "../components/common/text/welcome-message";
import OpeningsMenu from "../components/game/openings-menu";
import SidebarComponent from "../components/sidebar/sidebar";
import { useBoard } from "../contexts/board-context";
import { HistoryProvider } from "../contexts/history-context";

const HomeView: React.FC<{ setIsQuizActive: (isActive: boolean) => void }> = ({ setIsQuizActive }) => {
	const { setFen } = useBoard();

	return (
		<div className="home-container w-full h-full flex flex-col">
			<WelcomeMessageComponent />
			<HistoryProvider>
				<OpeningsMenu setFen={setFen} setIsQuizActive={setIsQuizActive} />
			</HistoryProvider>
			<SidebarComponent />
		</div>
	);
};

export default HomeView;
