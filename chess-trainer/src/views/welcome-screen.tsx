import { OpeningsMenu } from "../components/containers/openings-menu";
import WelcomeMessageComponent from "../components/text/welcome-message";

const WelcomeScreenComponent: React.FC = () => {
	return (
		<div className="welcome-container flex flex-col bg-light-blue-50 w-full h-1/2 absolute top-0 ">
			<WelcomeMessageComponent></WelcomeMessageComponent>
			<OpeningsMenu></OpeningsMenu>
		</div>
	);
};

export default WelcomeScreenComponent;
