import ButtonsContainer from "../containers/buttons-container";
import Header from "../text/header";
import Rules from "../text/rules";

const SidebarComponent = () => {
	return (
		<div className="sidebar flex flex-col justify-center items-center h-1/4 w-full z-30 relative left-1/2">
			<Header></Header>
			<Rules></Rules>
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
};

export default SidebarComponent;
