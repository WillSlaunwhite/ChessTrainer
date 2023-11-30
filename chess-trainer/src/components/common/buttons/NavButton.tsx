import { Button } from "@material-tailwind/react";

interface NavButtonProps {
	text?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text = "next" }) => {
	return (
		<Button variant="outlined" className="nav-button border-green-900 border-2 text-gray-600 focus:text-gray-400 focus:bg-blue-700 hover:text-gray-400 px-12 text-3xl font-sans font-normal tracking-wider py-7 rounded  hover:bg-blue-700 flex items-center">
        {text}
		</Button>
	);
};

export default NavButton;
