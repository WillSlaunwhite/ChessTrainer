import { OpeningsMenu } from "../components/containers/openings-menu";
import WelcomeMessageComponent from "../components/text/welcome-message";

const WelcomeScreenComponent: React.FC = () => {
	return (
		<div className="welcome-container">
			<WelcomeMessageComponent></WelcomeMessageComponent>
			<OpeningsMenu></OpeningsMenu>
		</div>
	);
};

export default WelcomeScreenComponent;
