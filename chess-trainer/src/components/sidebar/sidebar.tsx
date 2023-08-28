import ButtonsContainer from "../containers/buttons-container";
import Header from "../text/header";
import Rules from "../text/rules";

const SidebarComponent = () => {
	return (
		<div className="sidebar flex flex-col justify-center items-center h-full w-1/4">
			<Header></Header>
			<Rules></Rules>
			<ButtonsContainer></ButtonsContainer>
		</div>
	);
};

export default SidebarComponent;
