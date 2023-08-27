import React from "react";

const Header: React.FC = () => {
	return (
		<header className="text-gray-600 font-sans text-center flex flex-col justify-between h-28 w-screen subpixel-antialiased my-4">
			<h1 className="text-5xl mb-2 w-11/12 mx-auto">Welcome to Chess Trainer</h1>
			<h3 className="text-3xl w-full mx-auto">A modern chess openings tutor.</h3>
		</header>
	);
};

export default Header;
