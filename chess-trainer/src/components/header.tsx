import React from "react";

const Header: React.FC = () => {
	return (
		<header className="text-blue-300 font-mono text-center flex flex-col justify-between h-28 subpixel-antialiased my-4">
			<h1 className="text-4xl mb-2 w-4/5 mx-auto">Welcome to Chess Trainer</h1>
			<h3 className="text-xl w-full mx-auto">A modern chess openings tutor.</h3>
		</header>
	);
};

export default Header;
