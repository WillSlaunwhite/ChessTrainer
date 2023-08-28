import { OpeningsMenu } from "../components/containers/openings-menu";
import SidebarComponent from "../components/sidebar/sidebar";
import WelcomeMessageComponent from "../components/text/welcome-message";

const WelcomeScreenComponent: React.FC = () => {
	return (
		<div className="welcome-container flex flex-col bg-light-blue-50 md:w-2/5 w-full h-full absolute top-0 left-0 overflow-x-hidden overflow-y-scroll">
			<WelcomeMessageComponent></WelcomeMessageComponent>
			<OpeningsMenu></OpeningsMenu>
			<SidebarComponent ></SidebarComponent>
		</div>
	);
};

export default WelcomeScreenComponent;
