interface NavButtonProps {
	text?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text = "next" }) => {
	return (
		<button className="nav-button px-8 text-lg py-6 rounded bg-blue-600 top-16 ripple flex items-center">
			<div className="text-content">
        {text}
      </div>
		</button>
	);
};

export default NavButton;
