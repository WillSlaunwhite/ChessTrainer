interface NavButtonProps {
	text?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text = "next" }) => {
	return (
		<button className="ripple-bg-gray-300 nav-button text-gray-300 hover:text-gray-400 px-12 text-2xl font-mono py-7 rounded bg-blue-600 hover:bg-blue-700 top-14 ripple flex items-center">
			<div className="text-content">
        {text}
      </div>
		</button>
	);
};

export default NavButton;
