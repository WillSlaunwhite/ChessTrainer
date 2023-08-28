import NavButton from "../buttons/nav-button";

const ButtonsContainer: React.FC = () => {
	return (
		<div className="button-container h-[60px] w-full relative bottom-12 flex justify-around">
			<NavButton text="back"></NavButton>
			<NavButton text="next"></NavButton>
		</div>
	);
};

export default ButtonsContainer;
